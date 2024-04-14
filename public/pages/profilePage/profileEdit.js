'use strict';

import renderSettingsContainer from '../../components/settingsContainer/settingsContainer';
import EditProfileOverlay from '../../components/editProfileOverlay/editProfileOverlay.js';
import renderProfileMain from '../../components/profileMain/profileMain.js';
import ProfileCard from '../../components/profileCard/profileCard.js';
import RatingBar from '../../components/ratingBar/ratingBar.js';
import stringToHtmlElement from '../../modules/stringToHtmlElement.js';
import formatDate from '../../modules/formatDate.js';
import {buildURL} from '../../modules/parsePathParams.js';
import ajax from '../../modules/ajax';
import router from '../../router/router';

/**
 *
 */
export class ProfileEdit {
  #element;

  /**
   *
   * @param {*} header
   */
  constructor(header) {
    this.#element = document.createElement('div');
    this.#element.classList.add('main-page');
    this.header = header;
  }

  /**
   *
   * @return {HTMLElement}
   */
  render() {
    this.#renderTemplate();

    return this.#element;
  }

  /**
   *
   */
  #renderTemplate() {
    this.#element.appendChild(this.header.render());

    const root = renderProfileMain();
    this.#element.appendChild(root);
    const settings = document.createElement('div');
    settings.classList.add('personal-data-list');

    const apiRoute = buildURL(ajax.routes.PROFILE.GET_PROFILE,
        {'id': ajax.auth.id});
    ajax.get(
        apiRoute,
        (body) => {
          const profile = body['profile'];
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
            urlOrder: '/cart',
            urlSettings: router.routes.profileEdit.href,
            urlMerchant: '#',
          };

          const merchantsCardSection = this.#element.querySelector('.user-card-main-div');
          const profileCardInstance = new ProfileCard(this.profile);
          merchantsCardSection.appendChild(profileCardInstance.render());

          const rating = this.#element.querySelector('.rating');
          const ratingBarInstance = new RatingBar(profile.rating);
          const ratingBar = ratingBarInstance.render();
          rating.appendChild(ratingBar);

          const content = this.#element
              .querySelector('.merchant-page-right-section-switch');

          settings.appendChild(renderSettingsContainer(this.profile));
          content.appendChild(settings);

          const btns = document.querySelectorAll('.set-or-edit-label');
          const main = document.querySelector('.main-page');

          const forms = [{
            title: 'Изменить профиль',
            fields: [{type: 'text', value: this.profile.name, name: 'name'},
              {type: 'text', value: this.profile.surname, name: 'surname'}],
            apiRoute: ajax.routes.PROFILE.SET_PROFILE_AVATAR,
            id: 1,
          },
          {
            title: 'Номер телефона',
            fields: [{type: 'text', value: this.profile.phone,
              name: 'phone', isPhone: true}],
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
            fields: [{type: 'text', value: this.profile.city, name: 'id'}],
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
            const form = document.getElementsByTagName('form')[i + 1];

            form.addEventListener('submit', (ev) => {
              ev.preventDefault();
              const submit = form.querySelector('[type="submit"]');
              submit.disabled = true;

              const formData = new FormData(form);

              if (forms[i].apiRoute === ajax.routes.PROFILE.SET_PROFILE_AVATAR) {
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
                  data = {email};
                } else {
                  const id = inputs[0];
                  data = {id};
                }

                ajax.post(
                    forms[i].apiRoute,
                    data,
                    (body) => {
                      if (body.profile != null) {
                        router.go(router.routes.profileEdit.href);

                        return;
                      }

                      submit.disabled = false;
                      console.error('Ошибка редактирования профиля');
                    });
              }
            });
          }
        },
    );
  }
}
