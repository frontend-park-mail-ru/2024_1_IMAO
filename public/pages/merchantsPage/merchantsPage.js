'use strict';

import {renderAdsCardTemplate} from '../../components/adsCard/adsCard.js';
import MerchantCard from '../../components/merchantCard/merchantCard.js';
import HorizontalButtonGroup from '../../components/horizontalButtonGroup/horizontalButtonGroup.js';
import MerchantPageTitle from '../../components/merchantPageTitle/merchantPageTitle.js';
import RatingBar from '../../components/ratingBar/ratingBar.js';
import {FormatDate} from '../../modules/formatDate.js';
import StageStorage from '../../modules/stateStorage.js';
import ajax from '../../modules/ajax.js';
import router from '../../router/router.js';
import template from './merchantsPage.hbs';
import styles from './merchantsPage.css'; //eslint-disable-line no-unused-vars
import { StringToHtmlElement } from '../../modules/stringToHtmlElement.js';

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
    this.sectionState = new StageStorage();
    this.#isBottomReached = false;
  }

  /**
   * Render the main page.
   * @return {Element} - The element of main page.
   */
  async render() {
    await this.#renderTemplate();

    this.#addListeners();

    return this.#element;
  }

  async #addListeners() {
    const inputs = this.#element.querySelectorAll('.ActiveSoldList input[type="radio"]');

    inputs.forEach(function(input) {
      input.addEventListener('click', this.handleClick.bind(this));
    }.bind(this));

    this.#addScrollListener();
  }

  handleClick(event) {
    console.log(event.target.value);

    const merchantsCardContainer = this.#element.querySelector('.cards-container-merchant');
    const isRendered = this.sectionState.getSectionState(event.target.value, 'isRendered');

    const currentButtonChecked = this.sectionState.getSectionState('serviceField', 'isChecked');
    this.sectionState.setSectionState('serviceField', 'isChecked', event.target.value);

    this.sectionState.setSectionState(currentButtonChecked, 'render', merchantsCardContainer);

    if (!isRendered) {
      const newMerchantsCardContainer = document.createElement('div');
      newMerchantsCardContainer.classList.add('cards-container-merchant');
      merchantsCardContainer.replaceWith(newMerchantsCardContainer);
      this.sectionState.setSectionState(event.target.value, 'isRendered', merchantsCardContainer);
      this.#renderCards(newMerchantsCardContainer, isRendered);

    } else {
      const stashedMerchantsCardContainer = this.sectionState.getSectionState(event.target.value, 'render');
      merchantsCardContainer.replaceWith(stashedMerchantsCardContainer);
    }

    console.log(this.sectionState);
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
        const merchantsCardContainer = this.#element.querySelector('.cards-container-merchant');
        const currentState = this.sectionState.getSectionState('active', 'isRendered');
        this.#renderCards(merchantsCardContainer, currentState);
        if (!currentState) {
          this.sectionState.setSectionState('active', 'isRendered', true);
        }
        this.#isBottomReached = true;
      }
    };

    window.addEventListener('scroll', scrollHandler);
  }

  #renderCards(merchantsPageRightSection, alreadyRendered){
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

        adverts.forEach((inner) => {
          const {price, title, id, city, category} = inner;
          const path = city + '/' + category + '/' + id;

          merchantsPageRightSection.appendChild(StringToHtmlElement(renderAdsCardTemplate(title, this.sectionState.getSectionState('serviceField', 'isChecked'), id, path)));
        });

        this.#isBottomReached = false;
      },
    );
  }

  /**
   * Render a temlate for a merchant page.
   */
  async #renderTemplate() {
    const urlMain = router.routes.mainPage.href;
    this.#element.appendChild(this.header.render());
    const root = StringToHtmlElement(template());
    this.#element.appendChild(root);

    await ajax.get(
      ajax.routes.getProfile,
      (body) => {
        const profile = body['profile'];

        const merchantsName = profile.merchantsName;
        const ratingValue = profile.rating;

        const merchantPageTitleItems = {
          merchantsName: merchantsName,
          urlMain: urlMain,
        };
        const merchantPageTitleInstance = new MerchantPageTitle(merchantPageTitleItems);
        this.#element.insertBefore(merchantPageTitleInstance.render(), this.#element.lastChild);

        const merchantCartItems = {
          merchantsName: merchantsName,
          location: profile.city.translation,
          registrationDate: FormatDate(profile.regTime),
          isProfileVerified: profile.approved,
          reviewCount: profile.reactionsCount,
          subscribersCount: profile.subersCount,
          subscribtionsCount: profile.subonsCount,
        };
        const merchantsCardSection = this.#element.querySelector('.user-card-main-div');
        const merchantCardInstance = new MerchantCard(merchantCartItems);
        merchantsCardSection.appendChild(merchantCardInstance.render());

        const rating = this.#element.querySelector('.rating');
        const ratingBarInstance = new RatingBar(ratingValue);
        const ratingBar = ratingBarInstance.render();
        rating.appendChild(ratingBar);

        const merchantsPageRightSection = this.#element.querySelector('.merchant-page-right-section-switch');
        const buttonGroupItemes = [
          { categoryLabel: 'Активные', count: '20', checked: true, categoryLabelValue: 'active' },
          { categoryLabel: 'Проданные', count: '5', checked: false, categoryLabelValue: 'sold' },
        ];
        buttonGroupItemes.forEach(item => {
          this.sectionState.setSectionState(item.categoryLabelValue, 'isRendered', false);
        });
        buttonGroupItemes.forEach(item => {
          if (item.checked) {
            this.sectionState.setSectionState('serviceField', 'isChecked', item.categoryLabelValue);

            return;
          }
        });
        const horizontalButtonGroupInstance = new HorizontalButtonGroup(buttonGroupItemes);
        merchantsPageRightSection.appendChild(horizontalButtonGroupInstance.render());

        console.log(profile);
      }, { id: '1' },
    );

    const merchantsCardContainer = this.#element.querySelector('.cards-container-merchant');
    const currentState = this.sectionState.getSectionState('active', 'isRendered');
    this.#renderCards(merchantsCardContainer, currentState);
    if (!currentState) {
      this.sectionState.setSectionState('active', 'isRendered', true);
    }

    // const alreadyRendered = document.querySelector('.merchant-page-right-section') != null;
    // const merchantsPageRightSection = alreadyRendered ?
    //   document.querySelector('.merchant-page-right-section') :
    //   document.createElement('div');

    // if (!alreadyRendered) {

    // }

    // console.log('aboba');

    // this.#renderCards(merchantsPageRightSection, alreadyRendered);

  }
}
