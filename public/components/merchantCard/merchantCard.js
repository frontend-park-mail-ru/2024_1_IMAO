'use strict';

// export function renderMerchantCardTemplate(merchantsName, location, registrationDate, isProfileVerified, reviewCount, subscribersCount, subscribtionsCount) {
//   const template = Handlebars.templates['merchantCard.hbs'];
//   return template({merchantsName, location, registrationDate, isProfileVerified, reviewCount, subscribersCount, subscribtionsCount});
// }

'use strict';
import template from './merchantCard.hbs';
import styles from './merchantCard.css'; //eslint-disable-line no-unused-vars
import BlackListOverlay from '../../components/blackListOverlay/blackListOverlay.js';
import { StringToHtmlElement } from '../../modules/stringToHtmlElement.js';

class MerchantCard {
  #element;

  constructor(items){
      this.items = items;
  }

  render(){
    this.#renderTemplate();
    const addToBlackListButton = this.#element.querySelector('.add-to-blacklist-button');
    const overlayContainer = this.#element.querySelector('.overlay-container-blacklist');
    this.#addBlackListEventListener(addToBlackListButton, overlayContainer);
    console.log(addToBlackListButton);

return this.#element;
  }

  #renderTemplate() {
      const context = {
        merchantsName : this.items.merchantsName,
        location : this.items.location,
        registrationDate : this.items.registrationDate,
        isProfileVerified : this.items.isProfileVerified,
        reviewCount : this.items.reviewCount,
        subscribersCount : this.items.subscribersCount,
        subscribtionsCount : this.items.subscribtionsCount,
      };
      this.#element = StringToHtmlElement(template(context));
  }

  #addBlackListEventListener(addToBlackListButton, overlayContainer) {

    const blacklistOverlay = new BlackListOverlay(addToBlackListButton);
    console.log(blacklistOverlay);
    overlayContainer.appendChild(blacklistOverlay.render());
  }
}

export default MerchantCard;
