'use strict';

import {renderAdsCardTemplate} from '../../components/adsCard/adsCard.js';
import {renderMerchantCardTemplate} from '../../components/merchantCard/merchantCard.js';
import {renderActiveSoldSwitchTemplate} from '../../components/activeSoldSwitch/activeSoldSwitch.js';
import {renderMerchantPageTitleTemplate} from '../../components/merchantPageTitle/merchantPageTitle.js';
import {renderRatingBarTemplate} from '../../components/ratingBar/ratingBar.js';
import {RatingCalculation} from '../../modules/ratingCalculation.js';
import ajax from '../../modules/ajax.js';
import { StringToHtmlElement } from '../../modules/stringToHtmlElement.js';
import router from '../../router/router.js';



/** Class representing a main page. */
export class MerchantsPage {
  #element;

  /**
   * Initialize a main page.
   * @param {*} header
   */
  constructor(header) {
    this.#element = document.createElement('div');
    this.#element.classList.add('main-page');
    this.header = header;
  }

  /**
   * Render the main page.
   * @return {Element} - The element of main page.
   */
  render() {
    this.#renderTemplate();
    this.#addListeners();
    return this.#element;
  }

  #addListeners() {
    const anchors = this.#element.getElementsByClassName('link-merchant-page-title');

    this.#addButtonsListeners(anchors);

    //const logoutBtn = this.#element.getElementsByClassName('logout')[0];

    //this.#addLogoutListener(logoutBtn);
  }

  /**
   *  Add event listeners for an interface buttons.
   * @param {HTMLCollectionOf<Element>} buttons - Interface buttons elements.
   */
  #addButtonsListeners(buttons) {
    for (const anchor of buttons) {
      // if (anchor.dataset.url == undefined) {
      //   continue;
      // }

      anchor.addEventListener('click', (ev) => {
        router.pushPage(ev, anchor.dataset.url);
        console.log('clicked');
      });
    }
  }

  /**
   * Render a temlate for a main page.
   */
  #renderTemplate() {
    const urlMain = router.routes.mainPage.href;

    this.#element.appendChild(this.header.render());

    const merchantPageTitle = document.createElement('div');
    merchantPageTitle.classList.add('merchant-page-title');
    merchantPageTitle.innerHTML += renderMerchantPageTitleTemplate ('Абубакар', urlMain);
    this.#element.appendChild(merchantPageTitle);

    const content = document.createElement('div');
    content.classList.add('merchant-page-content');
    this.#element.appendChild(content);

    const merchantsName = 'Абубакар';
    const location = 'Ашхабад';
    const registrationDate = '123';
    const isProfileVerified = true;
    const reviewCount = '123';
    const subscribersCount = '123' ;
    const subscribtionsCount = '123';
    const merchantsCardContainer = StringToHtmlElement(renderMerchantCardTemplate(merchantsName, location, registrationDate, isProfileVerified, reviewCount, subscribersCount, subscribtionsCount));

    content.appendChild(merchantsCardContainer);

    const rating = merchantsCardContainer.querySelector('.rating');
    const ratingValue = 3.3;
    const svgArray = RatingCalculation(ratingValue);
    const ratingBar = StringToHtmlElement(renderRatingBarTemplate(ratingValue, svgArray));
    
    rating.appendChild(ratingBar);



    const merchantsPageRightSection = document.createElement('div');
    merchantsPageRightSection.classList.add('merchant-page-right-section');
    content.appendChild(merchantsPageRightSection);

    const merchantsPageRightSectionSwitch = document.createElement('div');
    merchantsPageRightSectionSwitch.classList.add('merchant-page-right-section-switch');
    merchantsPageRightSectionSwitch.innerHTML += renderActiveSoldSwitchTemplate (false, '333', '111');
    merchantsPageRightSection.appendChild(merchantsPageRightSectionSwitch);

    ajax.get(
        ajax.routes.main,
        (ads) => {
          const adverts = ads['adverts'];
          if (!(adverts && Array.isArray(adverts))) {
            return;
          }

          const cardsContainer = document.createElement('div');
          cardsContainer.classList.add('cards-container-merchant');

          adverts.forEach((inner) => {
            const {price, title} = inner;
            cardsContainer.innerHTML += renderAdsCardTemplate(title, price);
          });

          merchantsPageRightSection.appendChild(cardsContainer);
        },
    );
  }
}
