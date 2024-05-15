'use strict';

import ajax from '../../modules/ajax.js';
import stringToHtmlElement from '../../modules/stringToHtmlElement.js';
import template from './csatComp.hbs';
import styles from './csatComp.scss';

/**
 * Class represented a Csat survey component.
 */
class CsatComp {
  #element;

  /**
   * Constructor for Csat.
   * @param {*} items
   */
  constructor(items) {
    this.items = items;
  }

  /**
   * Returns a Csat survey component.
   * @return {*}
   */
  render() {
    this.#renderTemplate();
    this.#questuonSwitch();
    this.#addlistenerCloseCsat();

    return this.#element;
  }

  /**
   * Renders a Csat survey template.
   */
  #renderTemplate() {
    this.#element = stringToHtmlElement(template(this.items));
  }

  /**
   * Add listener for close button.
   */
  #addlistenerCloseCsat() {
    const closeBtn = this.#element.querySelector('.dialog-close');
    closeBtn.addEventListener('click', () => {
      window.top.postMessage('reply', '*');
    });
  }

  /**
   * Implements a question switching.
   */
  #questuonSwitch() {
    const radioBtns = this.#element.querySelectorAll('.custom-radioBtn');
    const inputFields = this.#element.querySelectorAll('input');
    const questionary = {};
    const questionaryContent = {};

    /**
     * Saves answers' results.
     */
    function readAnswers() {
      inputFields.forEach((input) => {
        if (input.checked) {
          questionary[input.name] = input.value;
          questionaryContent[input.name] = input.dataset.content;
        }
      });
    }

    /**
     * Turns into next question.
     * @param {HTMLElement} question
     */
    function turnQuestion(question) {
      question.classList.remove('interactive-widget__body--active');
      question.nextElementSibling.classList.add('interactive-widget__body--active');
    }

    radioBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const question = btn.parentNode.parentNode.parentNode;
        if (question.nextElementSibling.nextElementSibling) {
          readAnswers();
          turnQuestion(question);

          return;
        }
        readAnswers();
        turnQuestion(question);
        this.#element.querySelector('.interactive-widget__header h3').innerHTML = 'Завершение';
        if (this.items.questions.length != Object.keys(questionary).length) {
          return;
        }
        const data = {
          userId: ajax.auth.id,
          surveyId: 1,
          survey: [],
        };

        // eslint-disable-next-line guard-for-in
        for (const quest in questionary) {
          data.survey.push({
            answerNum: Number(quest),
            answerValue: Number(questionary[quest]),
          });
        }

        const apiRoute = ajax.routes.SURVEY.CREATE;

        ajax.post(apiRoute, data, (body) => {
          if (body) {
            return;
          }
        });
        setTimeout(() => window.top.postMessage('reply', '*'), 2000);
      });
    });
  }
}

export default CsatComp;
