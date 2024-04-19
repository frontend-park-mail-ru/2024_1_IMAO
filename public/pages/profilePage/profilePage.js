'use strict';

import renderProfileMain from '../../components/profileMain/profileMain.js';
import renderAdsCardTemplate from '../../components/adsCard/adsCard.js';
import renderSettingsContainer from '../../components/settingsContainer/settingsContainer';
import EditProfileOverlay from '../../components/editProfileOverlay/editProfileOverlay.js';
import ProfileCard from '../../components/profileCard/profileCard.js';
import EmptyAdvertsPlug from '../../components/emptyAdvertsPlug/emptyAdvertsPlug.js';
import EmptyOrderPlug from '../../components/emptyOrderPlug/emptyOrderPlug.js';
import HorizontalButtonGroup from '../../components/horizontalButtonGroup/horizontalButtonGroup.js';
import renderAdPathTemplate from '../../components/adPath/adPath.js';
import RatingBar from '../../components/ratingBar/ratingBar.js';
import formatDate from '../../modules/formatDate.js';
import StageStorage from '../../modules/stateStorage.js';
import ajax from '../../modules/ajax.js';
import router from '../../router/router.js';
import {buildURL, buildURLBySegments, parsePathParams, getURLFromLocation} from '../../modules/parsePathParams.js';

/** Class representing a main page. */
export class ProfilePage {
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
    this.sectionStateV = new StageStorage();
    this.sectionStateS = new StageStorage();
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

  /**
   *
   * @param {HTMLElement} form - Form for adding error.
   * @param {String} error - Error message.
   */
  #addError(form, error) {
    const divErr = form.querySelector('.error');

    divErr.innerHTML = error;
  }

  async #addListeners() {
    const inputs = this.#element.querySelectorAll('.ActiveSoldList input[type="radio"]');

    inputs.forEach(function(input) {
      input.addEventListener('click', this.handleClick.bind(this));
    }.bind(this));

    const verticalInputs = this.#element.querySelectorAll('.verticle-button-group-profile input[type="radio"]');

    verticalInputs.forEach(function(input) {
      input.addEventListener('click', this.handleClick2.bind(this));
    }.bind(this));

    //this.#addScrollListener();

  }

  handleClick2(event) {
    console.log(event.target.value);
    const targetValue = event.target.value;

    const labelsAndValues = [
      { categoryLabel: 'Мои объявления', categoryLabelValue: 'adverts' },
      { categoryLabel: 'Мои заказы', categoryLabelValue: 'orders' },
      { categoryLabel: 'Настроки', categoryLabelValue: 'settings' },
    ];

    const found = labelsAndValues.find(item => item.categoryLabelValue === targetValue);
    this.#element.querySelector('.profile-page-right-section-header').innerText = found.categoryLabel;
    const profilePageContentContainer = this.#element.querySelector('.profile-page-right-section-content');
    const isRendered = this.sectionStateV.getSectionState(event.target.value, 'isRendered');

    const currentButtonChecked = this.sectionStateV.getSectionState('serviceField', 'isChecked');
    this.sectionStateV.setSectionState('serviceField', 'isChecked', event.target.value);

    this.sectionStateV.setSectionState(currentButtonChecked, 'render', profilePageContentContainer);

    if (!isRendered) {
      const newProfilePageContentContainer = document.createElement('div');
      newProfilePageContentContainer.classList.add('profile-page-right-section-content');
      profilePageContentContainer.replaceWith(newProfilePageContentContainer);
      this.sectionStateV.setSectionState(event.target.value, 'isRendered', true);
      if (event.target.value === 'settings') {
          newProfilePageContentContainer.appendChild(renderSettingsContainer(this.profile));

          const btns = document.querySelectorAll('.set-or-edit-label');
          const main = document.querySelector('.main-page');

          const forms = [{
            title: 'Изменить профиль',
            fields: [{type: 'text', value: this.profile.name, name: 'name',
              place: 'Имя'},
            {type: 'text', value: this.profile.surname, name: 'surname',
              place: 'Фамилия'}],
            apiRoute: ajax.routes.PROFILE.SET_PROFILE_AVATAR,
            hasAvatar: true,
            avatar: this.profile.avatarImg,
            id: 1,
          },
          {
            title: 'Номер телефона',
            fields: [{type: 'text', value: this.profile.phone,
              name: 'phone', isPhone: true, place: '+7(___)___-__-__'}],
            apiRoute: ajax.routes.PROFILE.SET_PROFILE_PHONE,
            id: 2,
          },
          {
            title: 'E-mail',
            fields: [{type: 'text', value: this.profile.email, name: 'email'}],
            apiRoute: ajax.routes.PROFILE.EDIT_USER_EMAIL,
            id: 3,
          },
          {
            title: 'Город',
            fields: [{type: 'text', value: this.profile.city, name: 'id',
              isCitySearch: true}],
            apiRoute: ajax.routes.PROFILE.SET_PROFILE_CITY,
            id: 4,
          },
          ];

          for (let i = 0; i < btns.length; ++i) {
            const btn = btns[i];
            const overlay = new EditProfileOverlay(btn, forms[i]);
            main.appendChild(overlay.render());
          }

          for (let i = 0; i < btns.length; ++i) {
            const form = document.querySelectorAll('.profile-modal-content')[i];

            form.addEventListener('submit', (ev) => {
              ev.preventDefault();
              const submit = form.querySelector('.submit-btn');
              submit.disabled = true;

              const formData = new FormData(form);

              if (forms[i].apiRoute ===
                  ajax.routes.PROFILE.SET_PROFILE_AVATAR) {
                const name = formData.get('name');
                if (!validateName(name)) {
                  this.#addError(form, wrongNameFormat);
                  submit.disabled = false;

                  return;
                }

                const surname = formData.get('surname');
                if (!validateName(surname)) {
                  this.#addError(form, wrongSurnameFormat);
                  submit.disabled = false;

                  return;
                }

                ajax.postMultipart(
                    forms[i].apiRoute,
                    formData,
                    (body) => {
                      if (body.profile != null) {
                        router.go(router.routes.profileEdit.href);

                        return;
                      }

                      submit.disabled = false;
                      console.error('Ошибка редактирования профиля');
                    });
              } else {
                const inputs = [];
                for (const pair of formData) {
                  inputs.push(pair[1]);
                }

                let data = 0;
                if (i == 1) {
                  const phone = inputs[0];
                  data = {phone};
                } else if (i == 2) {
                  const email = inputs[0];

                  if (!validateEmail(email)) {
                    this.#addError(form, wrongEmailFormt);
                    submit.disabled = false;

                    return;
                  }

                  data = {email};
                } else {
                  const id = document.querySelector('.selected').dataset.id;
                  data = {'id': parseInt(id)};
                }

                ajax.post(
                    forms[i].apiRoute,
                    data,
                    (body) => {
                      if (body.profile != null || body.user != null) {
                        router.go(router.routes.profileEdit.href);

                        return;
                      }

                      if (body.status === 'This email is already in use') {
                        this.#addError(form, emailAlreadyExists);
                        submit.disabled = false;

                        return;
                      }
                    });
              }
            });
          }
      }

      if (event.target.value === 'orders') {
          //const merchantsPageRightSection = this.#element.querySelector('.merchant-page-right-section');
          const buttonGroupItemes = [
            {categoryLabel: 'Покупки', count: '', checked: true, categoryLabelValue: 'purchases'},
            {categoryLabel: 'Продажи', count: '', checked: false, categoryLabelValue: 'sales'},
          ];
          buttonGroupItemes.forEach((item) => {
            this.sectionStateS.setSectionState(item.categoryLabelValue, 'isRendered', false);
          });
          buttonGroupItemes.forEach((item) => {
            if (item.checked) {
              this.sectionStateS.setSectionState('serviceField', 'isChecked', item.categoryLabelValue);

              return;
            }
          });
          const horizontalButtonGroupInstance = new HorizontalButtonGroup(buttonGroupItemes);
          newProfilePageContentContainer.appendChild(horizontalButtonGroupInstance.render());

          const inputs = this.#element.querySelectorAll('.ActiveSoldList input[type="radio"]');

          inputs.forEach(function(input) {
            input.addEventListener('click', this.handleClick3.bind(this));
          }.bind(this));

        
          const currentState = this.sectionStateS.getSectionState('purchases', 'isRendered');
          if (!currentState) {
            this.sectionStateS.setSectionState('purchases', 'isRendered', true);
          }

          const header = this.sectionStateS.getSectionState('serviceField', 'isChecked') == 'purchases' ?  'Нет покупок' : 'Не продаж';
          const content = this.sectionStateS.getSectionState('serviceField', 'isChecked') == 'purchases' ?  'Заказы по купленным товарам' : 'Заказы по проданным товарам';
          
          const emptyOrderPlug = new EmptyOrderPlug(header, content);
          newProfilePageContentContainer.appendChild(emptyOrderPlug.render());
      }

      if (event.target.value === 'adverts') {
        //this.#renderCards(newProfilePageContentContainer, isRendered);
      }
      

    } else {
      const stashedMerchantsCardContainer = this.sectionStateV.getSectionState(event.target.value, 'render');
      profilePageContentContainer.replaceWith(stashedMerchantsCardContainer);
    }

    //console.log(this.sectionStateV);
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
      this.sectionState.setSectionState(event.target.value, 'isRendered', true);
      this.#renderCards(newMerchantsCardContainer, isRendered);

    } else {
      const stashedMerchantsCardContainer = this.sectionState.getSectionState(event.target.value, 'render');
      merchantsCardContainer.replaceWith(stashedMerchantsCardContainer);
    }

    //console.log(this.sectionState);
  }

  handleClick3(event) {
    console.log(event.target.value);
    
    const merchantsCardContainer = this.#element.querySelector('.empty-orders-main-container');
    const isRendered = this.sectionStateS.getSectionState(event.target.value, 'isRendered');

    const currentButtonChecked = this.sectionStateS.getSectionState('serviceField', 'isChecked');
    this.sectionStateS.setSectionState('serviceField', 'isChecked', event.target.value);

    this.sectionStateS.setSectionState(currentButtonChecked, 'render', merchantsCardContainer);

    if (!isRendered) {
      // const newMerchantsCardContainer = document.createElement('div');
      // newMerchantsCardContainer.classList.add('empty-orders-main-container');
      // merchantsCardContainer.replaceWith(newMerchantsCardContainer);
      this.sectionStateS.setSectionState(event.target.value, 'isRendered', true);
      
      const header = this.sectionStateS.getSectionState('serviceField', 'isChecked') == 'purchases' ?  'Нет покупок' : 'Нет продаж';
      const content = this.sectionStateS.getSectionState('serviceField', 'isChecked') == 'purchases' ?  'Заказы по купленным товарам' : 'Заказы по проданным товарам';
      
      const emptyOrderPlug = new EmptyOrderPlug(header, content);
      merchantsCardContainer.replaceWith(emptyOrderPlug.render());
      
      //newMerchantsCardContainer.appendChild(emptyOrderPlug.render());

    } else {
      const stashedMerchantsCardContainer = this.sectionStateS.getSectionState(event.target.value, 'render');
      merchantsCardContainer.replaceWith(stashedMerchantsCardContainer);
    }

    // console.log(this.sectionStateS);
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

  #renderCards(merchantsPageRightSection, alreadyRendered) {
    const cards = document.getElementsByClassName('card');
    const startID = cards.length == 0 ?
      1 :
      parseInt(cards[cards.length - 1].dataset['id']) + 1;

    ajax.routes.ADVERT.GET_ADS_LIST.searchParams.delete('deleted');
    ajax.routes.ADVERT.GET_ADS_LIST.searchParams.delete('userId');
    const state = this.sectionState.getSectionState('serviceField', 'isChecked') == 'active' ?
      0 : 1;
    const id = ajax.auth.id;
    ajax.routes.ADVERT.GET_ADS_LIST.searchParams.append('userId', id);
    ajax.routes.ADVERT.GET_ADS_LIST.searchParams.append('deleted', state);

    ajax.get(
        ajax.routes.ADVERT.GET_ADS_LIST,
        (body) => {
          const adverts = body['items'];
          
          if (!(adverts && Array.isArray(adverts))) {
            
            const content = this.sectionState.getSectionState('serviceField', 'isChecked') == 'active' ?  'активные' : 'проданные';
            const emptyAdvertsPlug = new EmptyAdvertsPlug(content);
            merchantsPageRightSection.appendChild(emptyAdvertsPlug.render());
            
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

            const path = buildURLBySegments(router.host, [city, category, id]);

            merchantsPageRightSection.appendChild(
                renderAdsCardTemplate(title, price, id, path),
            );
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
    const root = renderProfileMain();
    this.#element.appendChild(root);
    const id = ajax.auth.id;
    const path = buildURL(ajax.routes.PROFILE.GET_PROFILE, {'id': id});
    await ajax.get(
        path,
        (body) => {
          const profile = body['profile'];

          const merchantsName = profile.merchantsName;
          const ratingValue = profile.rating;

          // const merchantPageTitleItems = {
          // merchantsName: merchantsName,
          // urlMain: urlMain,
          // };
          // const merchantPageTitleInstance = new MerchantPageTitle(merchantPageTitleItems);
          // this.#element.insertBefore(merchantPageTitleInstance.render(), this.#element.lastChild);

          const merchantCartItems = {
            merchantsName: merchantsName,
            location: profile.city.translation,
            registrationDate: formatDate(profile.regTime),
            isProfileVerified: profile.approved,
            reviewCount: profile.reactionsCount,
            subscribersCount: profile.subersCount,
            subscribtionsCount: profile.subonsCount,
          };

          this.profile = {
            merchantsName: profile.merchantsName,
            ratingValue: profile.rating,
            name: profile.name,
            surname: profile.surname,
            phone: profile.phoneNumber,
            email: ajax.auth.email,
            city: profile.city.name,
            location: profile.city.translation,
            registrationDate: formatDate(profile.regTime),
            isProfileVerified: profile.approved,
            reviewCount: profile.reactionsCount,
            subscribersCount: profile.subersCount,
            subscribtionsCount: profile.subonsCount,
          };

          const merchantsCardSection = this.#element.querySelector('.user-card-main-div');
          const profileCardInstance = new ProfileCard(merchantCartItems);
          merchantsCardSection.appendChild(profileCardInstance.render());

          const verticleButtonGroupItemes = [
            { checked: true, categoryLabelValue: 'adverts' },
            { checked: false, categoryLabelValue: 'orders' },
            { checked: false, categoryLabelValue: 'settings' },
          ];
          verticleButtonGroupItemes.forEach(item => {
            this.sectionStateV.setSectionState(item.categoryLabelValue, 'isRendered', false);
          });
          verticleButtonGroupItemes.forEach(item => {
            if (item.checked) {
              this.sectionStateV.setSectionState('serviceField', 'isChecked', item.categoryLabelValue);
  
              return;
            }
          });

          const rating = this.#element.querySelector('.rating');
          const ratingBarInstance = new RatingBar(ratingValue);
          const ratingBar = ratingBarInstance.render();
          rating.appendChild(ratingBar);

          const merchantsPageRightSection = this.#element.querySelector('.merchant-page-right-section-switch');
          const buttonGroupItemes = [
            {categoryLabel: 'Активные', count: profile.activeAddsCount, checked: true, categoryLabelValue: 'active'},
            {categoryLabel: 'Проданные', count: profile.soldAddsCount, checked: false, categoryLabelValue: 'sold'},
          ];
          buttonGroupItemes.forEach((item) => {
            this.sectionState.setSectionState(item.categoryLabelValue, 'isRendered', false);
          });
          buttonGroupItemes.forEach((item) => {
            if (item.checked) {
              this.sectionState.setSectionState('serviceField', 'isChecked', item.categoryLabelValue);

              return;
            }
          });

          const horizontalButtonGroupInstance = new HorizontalButtonGroup(buttonGroupItemes);
          merchantsPageRightSection.appendChild(horizontalButtonGroupInstance.render());

        },
    );

    const merchantsCardContainer = this.#element.querySelector('.cards-container-merchant');
    const currentState = this.sectionState.getSectionState('active', 'isRendered');
    this.#renderCards(merchantsCardContainer, currentState);
    if (!currentState) {
      this.sectionState.setSectionState('active', 'isRendered', true);
    }
    this.sectionStateV.setSectionState('adverts', 'isRendered', true);

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