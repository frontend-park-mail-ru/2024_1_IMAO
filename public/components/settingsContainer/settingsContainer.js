'use strict';

// export function renderMerchantCardTemplate(merchantsName, location, registrationDate, isProfileVerified, reviewCount, subscribersCount, subscribtionsCount) {
//   const template = Handlebars.templates['merchantCard.hbs'];
//   return template({merchantsName, location, registrationDate, isProfileVerified, reviewCount, subscribersCount, subscribtionsCount});
// }

'use strict';
import template from './settingsContainer.hbs';
import styles from './settingsContainer.css'; //eslint-disable-line no-unused-vars
import { StringToHtmlElement } from '../../modules/stringToHtmlElement.js';

class ProfileCard {
  #element;

  constructor(items) {
      this.items = items;
  }

  render(){
    this.#renderTemplate();

return this.#element;
  }

  #renderTemplate() {
      const context = {
        profileName : this.items.profileName,
        location : this.items.location,
        registrationDate : this.items.registrationDate,
        isProfileVerified : this.items.isProfileVerified,
      };
      this.#element = StringToHtmlElement(template(context));
  }
}

export default ProfileCard;
