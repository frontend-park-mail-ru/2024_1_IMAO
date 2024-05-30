'use strict';

import renderAdPathTemplate from '../../components/adPath/adPath.js';
import renderAdContainerTemplate from '../../components/adContainer/adContainer.js';
import renderPromotionInfo from '../../components/promotionInfo/promotionInfo.js';
import AddCartOverlay from '../../components/addCartOverlay/addCartOverlay.js';
import PromotionOverlay from '../../components/promotionOverlay/promotionOverlay.js';
import PriceHistoryOverlay from '../../components/priceHistoryOverlay/priceHistoryOverlay.js';
import MerchantCard from '../../components/merchantCard/merchantCard.js';
import RatingBar from '../../components/ratingBar/ratingBar.js';
import {parsePathParams, buildURL, getURLFromLocation, buildURLBySegments} from '../../modules/parsePathParams.js';
import {formatDate, calculateLeftTime} from '../../modules/formatDate.js';
import trimString from '../../modules/trimString.js';
import {renderChart} from '../../modules/chartRender.js';
import ajax from '../../modules/ajax.js';
import router from '../../router/router.js';
import favoritesModel from '../../models/favorites.js';
import renderLoadingSpinner from '../../components/loadingSpinner/loadingSpinner.js';

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
    this.priceHistory = [];
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
    this.#addPriceHistoryListener();
    this.#addMerchantPageListener();
    this.#addCloseListener();
    this.#addFavoritesListener();
    this.#addEditListener();
    this.#addScrollListener();
    this.#promotionInterval();
  }

  /**
   * Add listeners for images carousel.
   */
  #addCarouselListeners() {
    const carousel = this.#element.querySelector('.carousel');
    const imagesContainer = this.#element.querySelector('.post-images');
    const prevBtn = this.#element.querySelector('.post-images__prev-btn');
    const nextBtn = this.#element.querySelector('.post-images__next-btn');
    const images = imagesContainer.querySelectorAll('.images__item');

    let currentTranslate = 0;
    let currentIndex = 0;
    const elemsOnPage = images.length;

    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1) % elemsOnPage;
      updateCarousel(currentIndex, elemsOnPage, movePrev);
    });

    nextBtn.addEventListener('click', () => {
      updateCarousel(currentIndex, elemsOnPage, moveNext);
      currentIndex = (currentIndex + 1) % elemsOnPage;
    });

    const updateCarousel = (currentIndex, elemsOnPage, moveFunc) => {
      const index = (currentIndex + elemsOnPage) % elemsOnPage;
      let imagesWidth = 0;
      images.forEach((image) => {
        imagesWidth += image.offsetWidth;
      });

      const carouselWidth = carousel.offsetWidth;
      const tolerance = (carouselWidth / 100) * 5;
      const currentWidth = images[index].offsetWidth;
      moveFunc(imagesWidth, currentWidth, carouselWidth, tolerance);
      carousel.style.transform = `translateX(${currentTranslate}px)`;
    };

    const moveNext = (imagesWidth, currentWidth, carouselWidth, tolerance) => {
      if (imagesWidth + currentTranslate > carouselWidth + tolerance) {
        if (imagesWidth + currentTranslate - currentWidth < carouselWidth) {
          currentTranslate += carouselWidth - (imagesWidth + currentTranslate);
        } else {
          currentTranslate -= currentWidth;
        }
      } else {
        currentTranslate = 0;
        currentIndex = -1;
      }
    };

    const movePrev = (imagesWidth, currentWidth, carouselWidth, tolerance) => {
      if (currentTranslate < 0) {
        if (currentTranslate + currentWidth > 0 + tolerance) {
          currentTranslate = 0;
        } else {
          currentTranslate += currentWidth;
        }
      } else {
        currentTranslate = carouselWidth - imagesWidth;
        currentIndex = elemsOnPage;
      }
    };
  }

  /**
   * Event listener on button in mobile mode.
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
   * Adds a price history dialog listener.
   */
  async #addPriceHistoryListener() {
    const priceHistoryButtons = this.#element.querySelectorAll('.history-btn');
    priceHistoryButtons.forEach((priceHistoryButton) => {
      if (priceHistoryButton == null) {
        return;
      }
      const priceHistoryOverlay = new PriceHistoryOverlay(priceHistoryButton, this.priceHistory);
      const advertBlock = this.#element.querySelector('.post-block');
      advertBlock.appendChild(priceHistoryOverlay.render());
    });
  }

  /**
   * Adds listener for an edit button.
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
    const promotionOverlay = new PromotionOverlay(promotionButton, promotionButton.dataset['id']);
    const advertBlock = this.#element.querySelector('.post-block');
    advertBlock.appendChild(promotionOverlay.render());
  }

  /**
   *
   * @param {*} promotion
   * @return {object}
   */
  #getPromotionData(promotion) {
    const promotionDays = promotion.promotionDuration.Days;
    const promotionStart = promotion.promotionStart;
    const duration = 24 * promotionDays;

    let tariff;
    switch (promotionDays) {
      case 1:
        tariff = 'Поднятие';
        break;
      case 3:
        tariff = 'Премиум';
        break;
      default:
        tariff = 'Максимум';
        break;
    }

    const leftTime = calculateLeftTime(duration, promotionStart);
    let timeTitle;
    if (leftTime >= 24) {
      const leftDays = Math.round(leftTime / 24);
      switch (leftDays) {
        case 1:
          timeTitle = 'Остался 1 день';
          break;
        case 2:
        case 3:
        case 4:
          timeTitle = `Осталось ${leftDays} дня`;
          break;
        default:
          timeTitle = `Осталось ${leftDays} дней`;
          break;
      }
    } else {
      switch (leftTime) {
        case 1:
        case 21:
          timeTitle = `Остался ${leftTime} час`;
          break;
        case 2:
        case 3:
        case 4:
        case 22:
        case 23:
          timeTitle = `Осталось ${leftTime} часа`;
          break;
        default:
          timeTitle = `Осталось ${leftTime} часов`;
      }
    }

    return {tariff, duration, leftTime, timeTitle};
  }

  /**
   *
   */
  #promotionInterval() {
    const curPath = window.location.href;
    let pingPromotion = new URL(ajax.routes.ADVERT.GET_PROMOTION);
    pingPromotion = buildURL(pingPromotion, {id: this.id});
    if (this.isAuthor && this.needPing) {
      const promBtn = this.#element.querySelector('.seller-block__btn--promote');
      const waiting = document.createElement('div');
      if (promBtn) {
        waiting.classList.add('waiting-section');

        const waitingText = document.createElement('div');
        waitingText.classList.add('waiting-section__text');
        waitingText.innerHTML = 'Платеж в обработке';

        const spinner = document.createElement('div');
        spinner.classList.add('waiting-section__spinner');
        spinner.appendChild(renderLoadingSpinner());

        waiting.appendChild(waitingText);
        waiting.appendChild(spinner);
        promBtn.replaceWith(waiting);
      }

      const newInterval = setInterval(() => {
        if (curPath !== window.location.href) {
          clearInterval(newInterval);
        }

        ajax.get(pingPromotion, (body) => {
          const promotion = body?.items;
          const isPromoted = promotion.isPromoted;
          let promotionData;
          if (isPromoted) {
            promotionData = this.#getPromotionData(promotion);
            if (waiting !== null) {
              waiting.replaceWith(renderPromotionInfo(promotionData));
            }
            clearInterval(newInterval);
            this.needPing = false;
          }
        });
      }, 1000);
    }
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
      const {advert, city, category, photos, promotion} = items;
      const photosFix = photos.map((value) => value.slice(1));

      const {active, id, title, description, price, isUsed, created, inFavourites, inCart, views, favouritesNum} =
        advert;
      this.id = id;
      const createdDate = formatDate(created);
      const cityName = city.name;
      const categoryName = category.name;
      const isAuthor = ajax.auth.id === advert.userId;
      this.isAuthor = isAuthor;
      const isPromoted = promotion.isPromoted;
      this.needPing = promotion.needPing;

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

      let promotionData;
      if (isPromoted) {
        promotionData = this.#getPromotionData(promotion);
      }

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
          photosFix,
          inFavourites,
          views,
          favouritesNum,
      );
      adContainer.classList.add('post-container');
      content.appendChild(adContainer);

      if (isPromoted) {
        const promBtn = content.querySelector('.seller-block__btn--promote');
        if (promBtn !== null) {
          promBtn.replaceWith(renderPromotionInfo(promotionData));
        }
      }

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
      const profile = body?.items;
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
        avatarImg: profile.avatar.slice(1),
        notIsAuthor: ajax.auth.id !== profile.userId,
      };

      const merchantCardInstance = new MerchantCard(merchantCartItems);
      sellerSection.appendChild(merchantCardInstance.render());

      const rating = this.#element.querySelector('.rating');
      const ratingBarInstance = new RatingBar(ratingValue);
      const ratingBar = ratingBarInstance.render();
      rating.appendChild(ratingBar);
    });

    let priceHistoryRoute = new URL(ajax.routes.ADVERT.GET_PRICE_HISTORY);
    priceHistoryRoute = buildURL(priceHistoryRoute, {id: this.id});
    await ajax.get(priceHistoryRoute, (body) => {
      if (body.code !== 200) {
        return;
      }
      this.priceHistory = body.items;
    });
    const canvas = this.#element.querySelector('.history-btn__canvas');
    const array = this.priceHistory.map((value) => value.newPrice);
    renderChart(canvas, array);

    const deffPrice = array[array.length - 2] - array[array.length - 1];
    const deffPriceElements = this.#element.querySelectorAll('.history-btn__price');
    deffPriceElements.forEach((deffPriceElement) => {
      if (deffPrice > 0) {
        deffPriceElement.classList.add('history-btn__price--positive');
        deffPriceElement.innerHTML = `&dArr; ${deffPrice} ₽ `;
      } else if (deffPrice < 0) {
        deffPriceElement.classList.add('history-btn__price--negative');
        deffPriceElement.innerHTML = `&uArr; ${Math.abs(deffPrice)} ₽ `;
      } else {
        deffPriceElement.innerHTML = `- ${deffPrice} ₽ `;
      }
    });
  }
}
