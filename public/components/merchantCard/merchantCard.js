'use strict';

import BlackListOverlay from '../../components/blackListOverlay/blackListOverlay.js';
import stringToHtmlElement from '../../modules/stringToHtmlElement.js';
import template from './merchantCard.hbs';
import styles from './merchantCard.scss';
import ajax from '../../modules/ajax.js';
import router from '../../router/router.js';

/**
 *
 */
class MerchantCard {
  #element;

  /**
   *
   * @param {*} items
   */
  constructor(items) {
    this.items = items;
  }

  /**
   *
   * @return {*}
   */
  render() {
    this.#renderTemplate();
    const addToBlackListButton = this.#element.querySelector('.blacklist-button');
    const overlayContainer = this.#element.querySelector('.actions-container__blacklist-overlay');
    if (addToBlackListButton) {
      this.#addBlackListEventListener(addToBlackListButton, overlayContainer);
    }
    this.#addSubscribeListener();

    return this.#element;
  }

  /**
   *
   */
  #addSubscribeListener() {
    const button = this.#element.querySelector('.subscribe-button');
    if (button === null) {
      return;
    }
    button.addEventListener('click', async () => {
      if (!router.auth.isAuth) {
        router.pushPage(event, router.routes.loginPage.href.href);

        return;
      }

      let subscribe = true;
      await ajax.post(ajax.routes.PROFILE.SUBSCRIPTION_CHANGE, {merchantId: this.items.id}, (body) => {
        if (body.code !== 200) {
          return;
        }
        subscribe = body.items.isAppended;
      });
      const message = this.#element.querySelector('.message');
      if (subscribe) {
        button.innerHTML = 'Отписаться';
        message.innerHTML = 'Вы подписались на продавца';
      } else {
        button.innerHTML = 'Подписаться';
        message.innerHTML = 'Вы отписались от продавца';
      }
      message.classList.remove('message--hidden');
      message.classList.add('message--active');
      setTimeout(() => {
        message.classList.add('message--hidden');
        message.classList.remove('message--active');
      }, 1000);
    });
  }

  /**
   *
   */
  #renderTemplate() {
    const context = {
      id: this.items.id,
      path: this.items.path,
      merchantsName: this.items.merchantsName,
      location: this.items.location,
      registrationDate: this.items.registrationDate,
      isProfileVerified: this.items.isProfileVerified,
      reviewCount: this.items.reviewCount,
      subscribersCount: this.items.subscribersCount,
      subscribtionsCount: this.items.subscribtionsCount,
      avatar: this.items.avatarImg,
      notIsAuthor: this.items.notIsAuthor,
      isSubscribed: this.items.isSubscribed,
    };

    this.#element = stringToHtmlElement(template(context));
  }

  /**
   *
   * @param {*} addToBlackListButton
   * @param {*} overlayContainer
   */
  #addBlackListEventListener(addToBlackListButton, overlayContainer) {
    const blacklistOverlay = new BlackListOverlay(addToBlackListButton);
    overlayContainer.appendChild(blacklistOverlay.render());
  }
}

export default MerchantCard;
