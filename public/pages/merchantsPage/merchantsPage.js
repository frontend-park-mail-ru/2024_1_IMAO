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
  render() {
    this.#renderTemplate();
    this.#addListeners();

    return this.#element;
  }

  #addListeners() {
    const anchors = this.#element.getElementsByTagName('a');
    //const buttonGroupElements = this.#element.getElementsByTagName('label');
    const buttonGroupElements = this.#element.querySelectorAll('.main-page');
    debugger;
    console.log(this.#element);
    console.log(buttonGroupElements);
    console.log(anchors);

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
      console.log('added');
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

  #handleClickFloorBtn(e) {
    const section = e.target.value;
    console.log(`handle click ${section}`);
    // let data = this.sectionState.getSectionState(section, 'json_coordinates');

    // if (!data) {
    //     //data = await requestDataByFloor(floorNum);
    //     state.setSectionState(floorNum, 'json_coordinates', data);

    // }

    // const needClear = state.getFloorState(floorNum, 'need_clear')
    // if (typeof needClear !== "undefined")
    // {
    //   renderPolygons(data, floorNum, needClear);
    //   state.setFloorState(floorNum, 'need_clear', false)
    // } else {
    //   renderPolygons(data, floorNum, needClear);
    // }
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
          cardsContainer.innerHTML +=
            renderAdsCardTemplate(title, price, id, path);
        });

        merchantsPageRightSection.appendChild(cardsContainer);
        this.#isBottomReached = false;
      },
    );
  }

  /**
   * Render a temlate for a merchant page.
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
          const ratingValue = profile.rating;

          this.#element.appendChild(this.header.render());

          const merchantPageTitle = document.createElement('div');
          merchantPageTitle.classList.add('merchant-page-title');
          const merchantPageTitleItems = {
            merchantsName : merchantsName,
            urlMain : urlMain,
          };
          const merchantPageTitleInstance = new MerchantPageTitle(merchantPageTitleItems);
          this.#element.appendChild(merchantPageTitleInstance.render());

          const merchantPageContent = document.createElement('div');
          merchantPageContent.classList.add('merchant-page-content');
          this.#element.appendChild(merchantPageContent);
          const merchantCartItems = {
             merchantsName : merchantsName,
             location : profile.city.translation,
             registrationDate :FormatDate(profile.regTime),
             isProfileVerified : profile.approved,
             reviewCount : profile.reactionsCount,
             subscribersCount : profile.subersCount,
             subscribtionsCount : profile.subonsCount,
          };
          const merchantCardInstance = new MerchantCard(merchantCartItems);
          const merchantsCardContainer = merchantCardInstance.render();
          merchantPageContent.appendChild(merchantsCardContainer);

          const rating = merchantsCardContainer.querySelector('.rating');
          const ratingBarInstance = new RatingBar(ratingValue);
          const ratingBar = ratingBarInstance.render();
          rating.appendChild(ratingBar);

          merchantsPageRightSection.classList.add('merchant-page-right-section');
          merchantPageContent.appendChild(merchantsPageRightSection);

          const merchantsPageRightSectionSwitch = document.createElement('div');
          merchantsPageRightSectionSwitch.classList.add('merchant-page-right-section-switch');
          const buttonGroupItemes = [
           { categoryLabel : 'Активные', count : '20', checked : true, categoryLabelValue : 'active' },
           { categoryLabel : 'Проданные', count : '5', checked : false, categoryLabelValue : 'sold' },
          ];
          const horizontalButtonGroupInstance = new HorizontalButtonGroup(buttonGroupItemes);
          merchantsPageRightSection.appendChild(merchantsPageRightSectionSwitch);
          merchantsPageRightSectionSwitch.appendChild(horizontalButtonGroupInstance.render());

          console.log(profile);
        }, {id : '1'},
      );
    }

    this.#renderCards(merchantsPageRightSection, alreadyRendered);

  }
}
