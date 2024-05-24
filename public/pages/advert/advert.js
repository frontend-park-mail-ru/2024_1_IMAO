'use strict';

import renderAdPathTemplate from '../../components/adPath/adPath.js';
import renderAdContainerTemplate from '../../components/adContainer/adContainer.js';
import AddCartOverlay from '../../components/addCartOverlay/addCartOverlay.js';
import PromotionOverlay from '../../components/promotionOverlay/promotionOverlay.js';
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
    this.#addPromotionDialogListener();
    this.#addMerchantPageListener();
    this.#addCloseListener();
    this.#addFavoritesListener();
    this.#addEditListener();
    this.#addScrollListener();
  }

  /**
   * Add listeners for images carousel.
   */
  #addCarouselListeners() {
    const prevBtn = this.#element.querySelector('.post-images__prev-btn');
    const nextBtn = this.#element.querySelector('.post-images__next-btn');
    const imagesList = this.#element.querySelector('.images');

    prevBtn.addEventListener('click', () => {
      const lastElement = imagesList.lastElementChild;
      imagesList.removeChild(lastElement);
      imagesList.insertBefore(lastElement, imagesList.firstElementChild);
    });

    nextBtn.addEventListener('click', () => {
      const firstElement = imagesList.firstElementChild;
      imagesList.removeChild(firstElement);
      imagesList.appendChild(firstElement);
    });
  }

  /**
   *
   */
  #addScrollListener() {
    const button = this.#element.querySelector('.seller-block__btn');
    let prevScrollpos = window.scrollY;
    window.onscroll = function() {
      const mediaQuery = window.matchMedia('(max-width: 900px)');
      if (!mediaQuery.matches) {
        return;
      }
      const currentScrollPos = window.scrollY;
      if (prevScrollpos > currentScrollPos) {
        button.style.bottom = '25px';
      } else {
        button.style.bottom = '-55px';
      }
      prevScrollpos = currentScrollPos;
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
    const closeBtn = this.#element.querySelector('.seller-block__btn--close');

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
   */
  async #addAddCartDialogListener() {
    const addCartButton = this.#element.querySelector('.seller-block__btn--cart');
    if (addCartButton == null) {
      return;
    }
    const addCartOverlay = new AddCartOverlay(addCartButton);
    const advertBlock = this.#element.querySelector('.post-block');
    advertBlock.appendChild(await addCartOverlay.render());
  }

  /**
   *
   */
  #addEditListener() {
    const editAddress = this.#element.querySelector('.favourite__btn--edit');
    if (editAddress === null) {
      return;
    }
    editAddress.addEventListener('click', (ev) => {
      router.pushPage(ev, editAddress.href);
    });
  }

  /**
   * Adds add to favorites listener.
   */
  #addFavoritesListener() {
    const addFavoritesButton = this.#element.querySelector('.favourite__btn--favourite');
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
      addFavoritesButton.children[0].classList.toggle('like-heart--active');
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
    const merchantAddress = this.#element.querySelector('.card-container__merchant-address');
    merchantAddress.addEventListener('click', (ev) => {
      router.pushPage(ev, merchantAddress.href);
    });
  }

  /**
   * Advert promotion dialog listener
   */
  #addPromotionDialogListener() {
    const promotionButton = this.#element.querySelector('.seller-block__btn--promote');
    if (promotionButton == null) {
      return;
    }
    const promotionOverlay = new PromotionOverlay(promotionButton);
    const advertBlock = this.#element.querySelector('.post-block');
    advertBlock.appendChild(promotionOverlay.render());
  }

  /**
   * Render the advert page template.
   */
  async #renderTemplate() {
    const content = document.createElement('div');

    this.#element.appendChild(this.header.render());

    content.classList.add('page-content');
    content.classList.add('post-page');
    this.#element.appendChild(content);

    const apiRoute = buildURL(ajax.routes.ADVERT.GET_ADVERT, this.#slug);

    let userId = 0;

    await ajax.get(apiRoute, (body) => {
      const {items} = body;
      const {advert, city, category, photosIMG} = items;

      const {active, id, title, description, price, isUsed, created, inFavourites, inCart, views, favouritesNum} =
        advert;
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
          active,
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
          favouritesNum,
      );
      adContainer.classList.add('post-container');
      content.appendChild(adContainer);

      document.title += ' ' + trimString(title, 40);
      const addCartButton = this.#element.querySelector('.seller-block__btn--cart');
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
        location: profile.city.name,
        registrationDate: formatDate(profile.regTime),
        isProfileVerified: profile.approved,
        reviewCount: profile.reactionsCount,
        subscribersCount: profile.subersCount,
        subscribtionsCount: profile.subonsCount,
        avatarImg: profile.avatarImg,
        notIsAuthor: ajax.auth.id !== profile.userId,
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
