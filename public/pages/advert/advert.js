'use strict';

import renderAdPathTemplate from '../../components/adPath/adPath.js';
import renderAdContainerTemplate from '../../components/adContainer/adContainer.js';
import AddCartOverlay from '../../components/addCartOverlay/addCartOverlay.js';
import MerchantCard from '../../components/merchantCard/merchantCard.js';
import RatingBar from '../../components/ratingBar/ratingBar.js';
import {parsePathParams, buildURL, getURLFromLocation, buildURLBySegments} from '../../modules/parsePathParams.js';
import formatDate from '../../modules/formatDate.js';
import trimString from '../../modules/trimString.js';
import ajax from '../../modules/ajax.js';
import router from '../../router/router.js';
import favoritesModel from '../../models/favorites.js';

/** Class representing advert page. */
export class Advert {
  #slug;
  #element;

  /**
   * Initialize the advert page.
   * @param {*} header
   */
  constructor(header) {
    this.#element = document.createElement('div');
    this.#element.classList.add('main-page');
    this.header = header;
    this.id = NaN;
  }

  /**
   * Render the advert Page.
   * @return {Element} - The advert page.
   */
  async render() {
    this.#getSlug();
    await this.#renderTemplate();
    this.#addListeners();

    return this.#element;
  }

  /**
   * Get slug parameters from URL.
   */
  #getSlug() {
    const url = getURLFromLocation(window.location.href, router.host);
    this.#slug = parsePathParams(router.routes.adPage.href, url);
  }

  /**
   * Add event listeners for page.
   */
  async #addListeners() {
    this.#addCarouselListeners();
    this.#addPathListener();
    await this.#addAddCartDialogListener();
    this.#addMerchantPageListener();
    this.#addCloseListener();
    this.#addFavoritesListener();
    this.#addEditListener();
  }

  /**
   * Add listeners for images carousel.
   */
  #addCarouselListeners() {
    const carousel = this.#element.querySelector('.carousel');
    const imagesContainer = this.#element.querySelector('.images');
    const prevBtn = this.#element.querySelector('.prev-btn');
    const nextBtn = this.#element.querySelector('.next-btn');
    const images = imagesContainer.querySelectorAll('.img-carousel');

    let currentIndex = 0;
    const elemsOnPage = images.length;

    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1) % elemsOnPage;
      updateCarousel(currentIndex, elemsOnPage);
    });

    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % elemsOnPage;
      updateCarousel(currentIndex, elemsOnPage);
    });

    const updateCarousel = (currentIndex, elemsOnPage) => {
      const index = (currentIndex + elemsOnPage) % elemsOnPage;

      const carouselWidth = carousel.offsetWidth;
      const currentWidth = images[index].offsetWidth;

      let newPosition = 0;
      if (index !== elemsOnPage - 1) {
        newPosition = (-index * 100 * currentWidth) / carouselWidth;
      } else {
        const lastWidth = images[images.length - 1].offsetWidth;
        const offset = lastWidth - (carouselWidth - currentWidth);
        newPosition = (-index * 100 * offset) / carouselWidth;
      }

      carousel.style.transform = `translateX(${newPosition}%)`;
    };
  }

  /**
   * Event listener to prevent page reload while clicking links in path.
   */
  #addPathListener() {
    const adPath = this.#element.querySelector('.ad-path');
    const links = adPath.querySelectorAll('a');

    for (const link of links) {
      link.addEventListener('click', (ev) => {
        const address = link.href;
        router.pushPage(ev, address);
      });
    }
  }

  /**
   * Event listener on advert close.
   */
  #addCloseListener() {
    const closeBtn = this.#element.querySelector('.close');

    if (closeBtn !== null) {
      closeBtn.addEventListener('click', (ev) => {
        ev.preventDefault();
        const id = closeBtn.dataset['id'];
        const apiRoute = buildURL(ajax.routes.ADVERT.CLOSE_ADVERT, {id: id});

        ajax.post(apiRoute, null, (body) => {
          router.go(router.routes.mainPage.href);

          return;
        });
      });
    }
  }

  /**
   * Adds cart dialog listener.
   * @param {*} addToBlackListButton
   * @param {*} overlayContainer
   */
  async #addAddCartDialogListener() {
    const addCartButton = this.#element.querySelector('.cart');
    if (addCartButton == null) {
      return;
    }
    const addCartOverlay = new AddCartOverlay(addCartButton);
    const advertBlock = this.#element.querySelector('.advert-block');
    advertBlock.appendChild(await addCartOverlay.render());
  }

  /**
   *
   */
  #addEditListener() {
    const editAddress = this.#element.querySelector('.btn-edit');
    if (editAddress === null) {
      return;
    }
    editAddress.addEventListener('click', (ev) => {
      router.pushPage(ev, editAddress.href);
    });
  }

  /**
   * Adds add to favorites listener.
   * @param {*} addToBlackListButton
   * @param {*} overlayContainer
   */
  #addFavoritesListener() {
    const addFavoritesButton = this.#element.querySelector('.btn-favourite');
    if (addFavoritesButton === null) {
      return;
    }
    addFavoritesButton.addEventListener('click', async (event) => {
      if (!router.auth.isAuth) {
        router.pushPage(event, router.routes.loginPage.href.href);

        return;
      }

      const result = await favoritesModel.changeFavorites(this.id);
      const message = this.#element.querySelector('.message');
      addFavoritesButton.children[0].classList.toggle('active');
      if (result) {
        addFavoritesButton.children[1].innerHTML = 'Удалить из избранного';
        message.innerHTML = 'Объявление добавлено в избранное';
      } else {
        addFavoritesButton.children[1].innerHTML = 'Добавить в избранное';
        message.innerHTML = 'Объявление удалено из избранного';
      }
      message.classList.remove('message--hidden');
      message.classList.add('message--active');
      setTimeout(() => {
        message.classList.add('message--hidden');
        message.classList.remove('message--active');
      }, 1000);
    });
  }

  /**
   * Event listener to redirect on merchant page.
   */
  #addMerchantPageListener() {
    const merchantAddress = this.#element.querySelector('.merchant-address');
    merchantAddress.addEventListener('click', (ev) => {
      router.pushPage(ev, merchantAddress.href);
    });
  }

  /**
   * Render the advert page template.
   */
  async #renderTemplate() {
    const content = document.createElement('div');

    this.#element.appendChild(this.header.render());

    content.classList.add('page-content');
    this.#element.appendChild(content);

    const apiRoute = buildURL(ajax.routes.ADVERT.GET_ADVERT, this.#slug);

    let userId = 0;

    await ajax.get(apiRoute, (body) => {
      const {items} = body;
      const {advert, city, category, photosIMG} = items;

      const {id, title, description, price, isUsed, created, inFavourites, inCart, views} = advert;
      this.id = id;
      const createdDate = formatDate(created);
      const cityName = city.name;
      const categoryName = category.name;
      const isAuthor = ajax.auth.id === advert.userId;

      let state = '';
      if (isUsed) {
        state = 'Б/У';
      } else {
        state = 'Новый';
      }
      userId = advert['userId'];

      const categoryPath = buildURLBySegments(router.host, [city['translation'], category['translation']]);
      const cityPath = buildURLBySegments(router.host, [city['translation']]);
      const editPath = buildURLBySegments(router.host, ['edit', advert['id']]);

      const adPathElement = document.createElement('div');
      const paths = [
        {
          path: cityPath,
          title: cityName,
        },
        {
          path: categoryPath,
          title: categoryName,
        },
        {
          path: '#',
          title: title,
        },
      ];
      adPathElement.appendChild(renderAdPathTemplate({paths}));
      content.appendChild(adPathElement);

      const adContainer = renderAdContainerTemplate(
          title,
          cityName,
          categoryName,
          description,
          createdDate,
          price,
          isAuthor,
          editPath,
          id,
          state,
          photosIMG,
          inFavourites,
          views,
      );
      adContainer.classList.add('ad-container');
      content.appendChild(adContainer);

      document.title += ' ' + trimString(title, 40);
      const addCartButton = this.#element.querySelector('.cart');
      if (addCartButton !== null) {
        if (inCart) {
          addCartButton.innerHTML = 'Удалить из корзины';
        }
      }
    });

    const sellerSection = this.#element.querySelector('.seller-block');

    const id = userId;
    const path = buildURL(ajax.routes.PROFILE.GET_PROFILE, {id});
    await ajax.get(path, (body) => {
      const profile = body['profile'];
      const merchantsName = profile.merchantsName;
      const ratingValue = profile.rating;
      const id = profile.id;
      const path = buildURL(router.routes.merchantsPage.href, {id});

      const merchantCartItems = {
        id: id,
        path: path,
        merchantsName: merchantsName,
        location: profile.city.translation,
        registrationDate: formatDate(profile.regTime),
        isProfileVerified: profile.approved,
        reviewCount: profile.reactionsCount,
        subscribersCount: profile.subersCount,
        subscribtionsCount: profile.subonsCount,
        avatarImg: profile.avatarImg,
      };

      const merchantCardInstance = new MerchantCard(merchantCartItems);
      sellerSection.appendChild(merchantCardInstance.render());

      const rating = this.#element.querySelector('.rating');
      const ratingBarInstance = new RatingBar(ratingValue);
      const ratingBar = ratingBarInstance.render();
      rating.appendChild(ratingBar);
    });
  }
}
