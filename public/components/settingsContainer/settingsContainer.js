'use strict';

import stringToHtmlElement from '../../modules/stringToHtmlElement.js';
import template from './settingsContainer.hbs';
import styles from './settingsContainer.scss';
import EditProfileOverlay from '../../components/editProfileOverlay/editProfileOverlay.js';
import {formatDate} from '../../modules/formatDate.js';
import {validateEmail, validateName, validatePhone} from '../../modules/validate.js';
import ajax from '../../modules/ajax.js';

const wrongEmailFormt = 'Неправильный формат электронной почты';
const emailAlreadyExists = 'Такой e-mail уже существует';
const wrongNameFormat = 'Имя должно содержать только буквы';
const wrongSurnameFormat = 'Фамилия должна содержать только буквы';
const wrongPhoneFormat = 'Неправильный формат телефона';

/**
 * Class represents a profile settings form.
 */
class SettingsContainer {
  #element;

  /**
   * Constructor for a settings container.
   * @param {object} profileData
   * @param {string} CSRFToken
   */
  constructor(profileData, CSRFToken) {
    this.profile = profileData;
    this.CSRFToken = CSRFToken;
    this.forms = [
      {
        title: 'Изменить профиль',
        fields: [
          {type: 'text', value: this.profile.name, name: 'name', place: 'Имя'},
          {type: 'text', value: this.profile.surname, name: 'surname', place: 'Фамилия'},
        ],
        apiRoute: ajax.routes.PROFILE.SET_PROFILE_AVATAR,
        hasAvatar: true,
        avatar: this.profile.avatarImg,
        id: 1,
      },
      {
        title: 'Номер телефона',
        fields: [{type: 'text', value: this.profile.phone, name: 'phone', isPhone: true, place: '+7(___)___-__-__'}],
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
        fields: [{type: 'text', value: this.profile.city, name: 'id', isCitySearch: true}],
        apiRoute: ajax.routes.PROFILE.SET_PROFILE_CITY,
        id: 4,
      },
    ];
  }

  /**
   * Returns a settings container.
   * @return {HTMLElement}
   */
  async render() {
    this.#renderTemplate();

    this.#renderDialogs();

    await this.#addListenersForOverlays(this.getForms());

    return this.#element;
  }

  /**
   * Gets a profile data.
   * @return {object}
   */
  getProfileData() {
    return this.profile;
  }

  /**
   * Get forms data.
   * @return {Array}
   */
  getForms() {
    return this.forms;
  }

  /**
   * Adds an error.
   * @param {*} form
   * @param {*} error
   */
  #addError(form, error) {
    const divErr = form.querySelector('.error');

    divErr.innerHTML = error;
  }

  /**
   * Renders a settings container template.
   */
  #renderTemplate() {
    const context = {
      merchantsName: this.profile.merchantsName,
      phone: this.profile.phone,
      email: this.profile.email,
      city: this.profile.city,
    };

    this.#element = stringToHtmlElement(template(context));
  }

  /**
   * Renders dialogs for form fields.
   */
  #renderDialogs() {
    const btns = this.#element.querySelectorAll('.settings-block__set-or-edit-label');

    btns.forEach((_, i) => {
      const btn = btns[i];
      const overlay = new EditProfileOverlay(btn, this.forms[i], this.profile.city, this.CSRFToken);
      this.#element.appendChild(overlay.render());
    });
  }

  /**
   * Edit profile due to form info.
   * @param {HTMLElement} forms - Edit profile form.
   */
  async #addListenersForOverlays(forms) {
    const btns = this.#element.querySelectorAll('.settings-block__set-or-edit-label');

    btns.forEach(async (_, i) => {
      const form = this.#element.querySelectorAll('.profile-modal__content')[i];
      form.addEventListener('submit', async (ev) => {
        ev.preventDefault();
        const submit = form.querySelector('.submit-btn');
        submit.disabled = true;

        const formData = new FormData(form);

        if (forms[i].apiRoute === ajax.routes.PROFILE.SET_PROFILE_AVATAR) {
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

          const avatar = formData.get('avatar');

          let profile = {};
          await ajax.postMultipart(forms[i].apiRoute, formData, (body) => {
            if (body.items != null) {
              profile = body['items'];

              return;
            }
            submit.disabled = false;
            console.error('Ошибка редактирования профиля');
          });
          const profileAvatar = document.querySelector('.avatar-image');
          const headerAvatar = document.querySelector('.profile-icon');
          const profileName = document.querySelector('.merchant-card__profile-name');

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
            avatarImg: profile.avatarImg,
          };

          profileName.innerHTML = profile.merchantsName;
          profileAvatar.src = profile.avatarImg ?
            `data:image/png;base64,${profile.avatarImg}` :
            '/images/img_avatar.webp';
          headerAvatar.src = profileAvatar.src;

          const profilePageContentContainer = document.querySelector('.profile-page__content');
          const settingsContainer = new SettingsContainer(this.profile, this.CSRFToken);
          profilePageContentContainer.lastElementChild.replaceWith(await settingsContainer.render());
          this.#addListenersForOverlays(settingsContainer.getForms());

          return;
        }

        const inputs = [];
        for (const pair of formData) {
          inputs.push(pair[1]);
        }

        let data = 0;
        switch (i) {
          case 1:
            const phone = inputs[0];
            data = {phone};

            if (!validatePhone(phone)) {
              this.#addError(form, wrongPhoneFormat);
              submit.disabled = false;

              return;
            }
            break;

          case 2:
            const email = inputs[0];

            if (!validateEmail(email)) {
              this.#addError(form, wrongEmailFormt);
              submit.disabled = false;

              return;
            }

            data = {email};
            break;

          default:
            const id = this.#element.querySelector('.citylist__option--selected').dataset.id;
            data = {id: parseInt(id)};
            break;
        }
        let dataBody = {};
        await ajax.post(forms[i].apiRoute, data, (body) => {
          dataBody = body.items;
        });

        if (dataBody.status === 'This email is already in use') {
          this.#addError(form, emailAlreadyExists);
          submit.disabled = false;

          return;
        }

        if (dataBody.profile) {
          const profile = dataBody.profile;
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
            avatarImg: profile.avatarImg,
          };
        }

        if (dataBody.user) {
          this.profile.email = dataBody.user.email;
        }

        const profilePageContentContainer = document.querySelector('.profile-page__content');
        const settingsContainer = new SettingsContainer(this.profile, this.CSRFToken);
        profilePageContentContainer.lastElementChild.replaceWith(await settingsContainer.render());
      });
    });
  }
}

export default SettingsContainer;
