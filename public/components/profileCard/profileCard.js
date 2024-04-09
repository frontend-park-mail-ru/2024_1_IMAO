'use strict';

// export function renderMerchantCardTemplate(merchantsName, location, registrationDate, isProfileVerified, reviewCount, subscribersCount, subscribtionsCount) {
//   const template = Handlebars.templates['merchantCard.hbs'];
//   return template({merchantsName, location, registrationDate, isProfileVerified, reviewCount, subscribersCount, subscribtionsCount});
// }

'use strict';
import template from './profileCard.hbs';
import styles from './profileCard.css'; //eslint-disable-line no-unused-vars
import BlackListOverlay from '../../components/blackListOverlay/blackListOverlay.js';
import { StringToHtmlElement } from '../../modules/stringToHtmlElement.js';

class ProfileCard {
  #element;

  constructor(items) {
      this.items = items;
  }

  render(){
    this.#renderTemplate();
    const overlayContainer = this.#element.querySelector('.overlay-container-blacklist');

return this.#element;
  }

  #renderTemplate() {
      const context = {
        profileName : this.items.profileName,
        location : this.items.location,
        registrationDate : this.items.registrationDate,
        isProfileVerified : this.items.isProfileVerified,
        reviewCount: this.items.reviewCount,
        subscribersCount: this.items.subscribersCount,
        subscribtionsCount: this.items.subscribtionsCount,
      };
      this.#element = StringToHtmlElement(template(context));
  }
}

export default ProfileCard;
