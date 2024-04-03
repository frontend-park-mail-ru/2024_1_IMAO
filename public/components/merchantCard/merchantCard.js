'use strict';

// export function renderMerchantCardTemplate(merchantsName, location, registrationDate, isProfileVerified, reviewCount, subscribersCount, subscribtionsCount) {
//   const template = Handlebars.templates['merchantCard.hbs'];
//   return template({merchantsName, location, registrationDate, isProfileVerified, reviewCount, subscribersCount, subscribtionsCount});
// }

'use strict';
import template from './merchantCard.hbs';
import styles from './merchantCard.css'; //eslint-disable-line no-unused-vars
import { StringToHtmlElement } from '../../modules/stringToHtmlElement.js';

class MerchantCard { 
  constructor(items){
      this.items = items;
  }

  render() {
      const context = {
        merchantsName : this.items.merchantsName, 
        location : this.items.location, 
        registrationDate : this.items.registrationDate, 
        isProfileVerified : this.items.isProfileVerified, 
        reviewCount : this.items.reviewCount, 
        subscribersCount : this.items.subscribersCount, 
        subscribtionsCount : this.items.subscribtionsCount
      };
      const root = StringToHtmlElement(template(context));

      return root;
  }
}

export default MerchantCard; 