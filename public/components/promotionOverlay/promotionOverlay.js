'use strict';

import template from './promotionOverlay.hbs';
import './promotionOverlay.scss';
import stringToHtmlElement from '../../modules/stringToHtmlElement';
import ajax from '../../modules/ajax';
import router from '../../router/router.js';

/**
 * Class represented advert promotion overlay.
 */
class PromotionOverlay {
  #element;
  #advertId;

  /**
   * Constructor for promotion overlay.
   * @param {HTMLElement} button - Button for advert promotion.
   * @param {String} advertId - Advert ID.
   */
  constructor(button, advertId) {
    this.button = button;
    this.#advertId = advertId;
  }

  /**
   * Renders promotion overlay.
   * @return {HTMLElement} - Promotion overlay.
   */
  render() {
    this.#renderTemplate();

    this.#addListeners();
    this.#addRadioButtonListeners();
    this.#addPaymentListener();

    return this.#element;
  }

  /**
   * Renders promotion overlay template.
   */
  #renderTemplate() {
    this.#element = stringToHtmlElement(template());
  }

  /**
   * Add event listeners for promotion overlay.
   */
  #addListeners() {
    const myDialog = this.#element;
    const myButton = this.button;

    myButton.addEventListener('click', (ev) => {
      ev.preventDefault();
      myDialog.showModal();
    });

    myDialog.addEventListener('click', () => {
      myDialog.close();
    });

    const myDiv = this.#element.querySelector('.promotion-dialog__container');
    myDiv.addEventListener('click', (event) => event.stopPropagation());
  }

  /**
   * Add event listeners for list of tariffes.
   */
  #addRadioButtonListeners() {
    const tariffes = this.#element.querySelectorAll('.tariff');
    const radioButtons = this.#element.querySelectorAll('.tariff__radio');

    for (let i = 0; i < tariffes.length; ++i) {
      const elem = tariffes[i];
      elem.addEventListener('click', () => {
        tariffes.forEach((tariff) => {
          tariff.classList.remove('tariff__selected');
        });

        elem.classList.add('tariff__selected');
        radioButtons[i].checked = true;

        const promoteButton = this.#element.querySelector('.promote-btn');
        const price = this.#element.querySelectorAll('.tariff__desc--price')[i].innerHTML;
        promoteButton.innerHTML = `Продвинуть за ${price}`;
      });
    }
  }

  /**
   * Add event listener for payment button.
   */
  #addPaymentListener() {
    const promoteButton = this.#element.querySelector('.promote-btn');

    promoteButton.addEventListener('click', () => {
      const selected = this.#element.querySelector('input[name="tariffPlan"]:checked');
      const rate = parseInt(selected.value, 10);
      const advertId = parseInt(this.#advertId, 10);

      const body = {rate, advertId};
      ajax.post(ajax.routes.PAYMENTS.FORM, body, (data) => {
        if (data.code != 200) {
          return;
        }

        document.location.href = data.paymentFormUrl;
      });
    });
  }
}

export default PromotionOverlay;
