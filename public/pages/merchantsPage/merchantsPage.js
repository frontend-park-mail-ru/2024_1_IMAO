'use strict';

import {renderAdsCardTemplate} from '../../components/adsCard/adsCard.js';
import {renderMerchantCardTemplate} from '../../components/merchantCard/merchantCard.js';
import {renderActiveSoldSwitchTemplate} from '../../components/activeSoldSwitch/activeSoldSwitch.js';
import {renderMerchantPageTitleTemplate} from '../../components/merchantPageTitle/merchantPageTitle.js';
import {renderRatingBarTemplate} from '../../components/ratingBar/ratingBar.js';
import {RatingCalculation} from '../../modules/ratingCalculation.js';
import {FormatDate} from '../../modules/formatDate.js';
import ajax from '../../modules/ajax.js';
import { StringToHtmlElement } from '../../modules/stringToHtmlElement.js';
import router from '../../router/router.js';
import {parsePathParams} from '../../modules/parsePathParams.js';



/** Class representing a main page. */
export class MerchantsPage {
  #element;
  #isBottomReached;


  /**
   * Initialize a main page.
   * @param {*} header
   */
  constructor(header) {
    this.#element = document.createElement('div');
    this.#element.classList.add('main-page');
    this.header = header;
    this.#isBottomReached = false;
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
    const anchors = this.#element.getElementsByTagName('a');;

    this.#addButtonsListeners(anchors);

    this.#addScrollListener();

    //const logoutBtn = this.#element.getElementsByClassName('logout')[0];

    //this.#addLogoutListener(logoutBtn);
  }

  /**
   *  Add event listeners for an interface buttons.
   * @param {HTMLCollectionOf<Element>} buttons - Interface buttons elements.
   */
  #addButtonsListeners(buttons) {
    for (const anchor of buttons) {
      if (anchor.dataset.url == undefined) {
        continue;
      }

      anchor.addEventListener('click', (ev) => {
        router.pushPage(ev, anchor.dataset.url);
        console.log('clicked Главная');
      });
    }
  }

  /**
   * Add event listener for scrolling main page.
   */
  #addScrollListener() {
    const scrollHandler = () => {
      const position = window.scrollY;
      const winHeight = window.innerHeight;
      const docHeight = document.body.scrollHeight;

      if (position + winHeight >= docHeight && !this.#isBottomReached) {
        this.#renderTemplate();
        this.#isBottomReached = true;
      }
    };

    window.addEventListener('scroll', scrollHandler);
  }

  /**
   * Render a temlate for a main page.
   */
  #renderTemplate() {
    const urlMain = router.routes.mainPage.href;

    const alreadyRendered = document.querySelector('.merchant-page-right-section') != null;
    const merchantsPageRightSection = alreadyRendered ?
      document.querySelector('.merchant-page-right-section') :
      document.createElement('div');

    if (!alreadyRendered) {
        
      ajax.get(
        ajax.routes.getProfile,
        (body) => {
          const profile = body['profile'];

          const merchantsName = profile.merchantsName;
          const location = profile.city.translation;
          const registrationDate = FormatDate(profile.regTime);
          const isProfileVerified = profile.approved;
          const ratingValue = profile.rating;
          const reviewCount = profile.reactionsCount;
          const subscribersCount = profile.subersCount ;
          const subscribtionsCount = profile.subonsCount;

          this.#element.appendChild(this.header.render());
    
          const merchantPageTitle = document.createElement('div');
          merchantPageTitle.classList.add('merchant-page-title');
          merchantPageTitle.innerHTML += renderMerchantPageTitleTemplate (merchantsName, urlMain);
          this.#element.appendChild(merchantPageTitle);
      
          const merchantPageContent = document.createElement('div');
          merchantPageContent.classList.add('merchant-page-content');
          this.#element.appendChild(merchantPageContent);
      
          
          const merchantsCardContainer = StringToHtmlElement(renderMerchantCardTemplate(merchantsName, location, registrationDate, isProfileVerified, reviewCount, subscribersCount, subscribtionsCount));
      
          merchantPageContent.appendChild(merchantsCardContainer);
      
          const rating = merchantsCardContainer.querySelector('.rating');
          
          const svgArray = RatingCalculation(ratingValue);
          const ratingBar = StringToHtmlElement(renderRatingBarTemplate(ratingValue, svgArray));
          
          rating.appendChild(ratingBar);
      
          merchantsPageRightSection.classList.add('merchant-page-right-section');
          merchantPageContent.appendChild(merchantsPageRightSection);
      
          const merchantsPageRightSectionSwitch = document.createElement('div');
          merchantsPageRightSectionSwitch.classList.add('merchant-page-right-section-switch');
          const itemes  = [
           { categoryLabel : 'Активные', count : '25' },
           { categoryLabel : 'Проданные', count : '5' }
          ];
          merchantsPageRightSectionSwitch.innerHTML += renderActiveSoldSwitchTemplate (itemes);
          merchantsPageRightSection.appendChild(merchantsPageRightSectionSwitch);
          
          console.log(profile)
        }, {id : '2'} 
      );  
    } 

    const cards = document.getElementsByClassName('card');
    const startID = cards.length == 0 ?
      1 :
      parseInt(cards[cards.length - 1].dataset['id']) + 1;

    ajax.routes.main.searchParams.delete('count');
    ajax.routes.main.searchParams.delete('startId');

    ajax.routes.main.searchParams.append('count', 28);
    ajax.routes.main.searchParams.append('startId', startID);

    ajax.get(
      ajax.routes.main,
      (body) => {
        const adverts = body['items'];
        if (!(adverts && Array.isArray(adverts))) {
          return;
        }

        const cardsContainer = !alreadyRendered ?
          document.createElement('div') :
          document.querySelector('.cards-container-merchant');
        if (!alreadyRendered) {
          cardsContainer.classList.add('cards-container-merchant');
        }

        // const cardsContainer = document.createElement('div');
        // cardsContainer.classList.add('cards-container-merchant');

        adverts.forEach((inner) => {
          const {price, title, id, city, category} = inner;
          const path = city + '/' + category + '/' + id;
          cardsContainer.innerHTML +=
            renderAdsCardTemplate(title, price, id, path);
        });

        merchantsPageRightSection.appendChild(cardsContainer);
        this.#isBottomReached = false;
      },
  );
  }
}
