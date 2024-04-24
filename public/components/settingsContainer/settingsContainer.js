'use strict';

import stringToHtmlElement from '../../modules/stringToHtmlElement.js';
import template from './settingsContainer.hbs';
import styles from './settingsContainer.scss';
import formatDate from '../../modules/formatDate.js';
import Handlebars from 'handlebars';
import ajax from '../../modules/ajax.js';
import {validateEmail, validateName} from '../../modules/validate.js';
import EditProfileOverlay from '../../components/editProfileOverlay/editProfileOverlay.js';


// export default function renderSettingsContainer(profileData) {
//   Handlebars.registerHelper('is_null', function(value) {
//     return value === '';
//   });

//   return stringToHtmlElement(template(profileData));
// }

/**
 *
 */
class SettingsContainer {
  #element

  constructor(profileData) {
      this.profileData = profileData;
      this.forms = [{
        title: 'Изменить профиль',
        fields: [{type: 'text', value: this.profileData.name, name: 'name',
          place: 'Имя'},
        {type: 'text', value: this.profileData.surname, name: 'surname',
          place: 'Фамилия'}],
        apiRoute: ajax.routes.PROFILE.SET_PROFILE_AVATAR,
        hasAvatar: true,
        avatar: this.profileData.avatarImg,
        id: 1,
      },
      {
        title: 'Номер телефона',
        fields: [{type: 'text', value: this.profileData.phone,
          name: 'phone', isPhone: true, place: '+7(___)___-__-__'}],
        apiRoute: ajax.routes.PROFILE.SET_PROFILE_PHONE,
        id: 2,
      },
      {
        title: 'E-mail',
        fields: [{type: 'text', value: this.profileData.email, name: 'email'}],
        apiRoute: ajax.routes.PROFILE.EDIT_USER_EMAIL,
        id: 3,
      },
      {
        title: 'Город',
        fields: [{type: 'text', value: this.profileData.city, name: 'id',
          isCitySearch: true}],
        apiRoute: ajax.routes.PROFILE.SET_PROFILE_CITY,
        id: 4,
      },
      ];
  }


  render() {
    this.#renderTemplate();

    this.#renderDialogs();

    this.#addListeners();

    return this.#element;
  }

  getProfileData(){

    return this.profileData;
  }

  getForms(){

    return this.forms;
  }

  #addError(form, error) {
    const divErr = form.querySelector('.error');

    divErr.innerHTML = error;
  }

  #renderTemplate() {
    const context = {
      merchantsName: this.profileData.merchantsName,
      phone: this.profileData.phone,
      email: this.profileData.email,
      city: this.profileData.city,
    };

    Handlebars.registerHelper('is_null', function(value) {
      return value === '';
    });

    this.#element = stringToHtmlElement(template(context));
  }

  #renderDialogs(){
    const btns = this.#element.querySelectorAll('.settings-block__set-or-edit-label');
    
    for (let i = 0; i < btns.length; ++i) {
      const btn = btns[i];
      const overlay = new EditProfileOverlay(btn, this.forms[i], this.profileData.city);
      this.#element.appendChild(overlay.render());
    }

  }

  #addListeners(){

  
  }
}

export default SettingsContainer;

