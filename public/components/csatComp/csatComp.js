'use strict';

import stringToHtmlElement from '../../modules/stringToHtmlElement.js';
import template from './csatComp.hbs';
import styles from './csatComp.scss';

/**
 *
 */
class CsatComp {
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
    this.#questuonSwitch();

    return this.#element;
  }

  /**
   *
   */
  #renderTemplate() {
    // const context = {
    //   id: this.items.id,
    //   path: this.items.path,
    //   merchantsName: this.items.merchantsName,
    //   location: this.items.location,
    //   registrationDate: this.items.registrationDate,
    //   isProfileVerified: this.items.isProfileVerified,
    //   reviewCount: this.items.reviewCount,
    //   subscribersCount: this.items.subscribersCount,
    //   subscribtionsCount: this.items.subscribtionsCount,
    //   avatar: this.items.avatarImg,
    // };

    this.#element = stringToHtmlElement(template(this.items));
  }

  /**
   *
   */
  #questuonSwitch() {
    const radioBtns = this.#element.querySelectorAll('.custom-radioBtn');
    const inputFields = this.#element.querySelectorAll('input');
    const questionary = {};
    const questionaryContent = {};

    function readAnswers() {
      inputFields.forEach((input)=>{
        if (input.checked) {
          questionary[input.name]=input.value;
          questionaryContent[input.name] = input.dataset.content;
        }
      });
    }

    const rcmndPlan = 'Solo';
    // function recommender() {
    //   if (questionary.documents != '30') {
    //     if (questionary.documents == '90') {
    //       rcmndPlan = 'Solo+';
    //     } else if (questionary.documents == 'limitless') {
    //       rcmndPlan = 'Business';
    //     }
    //   }
    //   if (questionary.clients != '60') {
    //     if (questionary.clients == '90' && rcmndPlan != 'Business') {
    //       rcmndPlan = 'Solo+';
    //     } else if (questionary.clients == 'limitless') {
    //       rcmndPlan = 'Business';
    //     }
    //   }
    //   if (questionary.coworker != '1') {
    //     if (questionary.coworker == '2') {
    //       rcmndPlan = 'Business';
    //     } else if (questionary.coworker == 'limitless') {
    //       rcmndPlan = 'Customized';
    //     }
    //   }
    //   if (questionary.articles == 'limitless' && rcmndPlan != 'Customized') {
    //     rcmndPlan = 'Business';
    //   }
    //   if (questionary.templates == '' && rcmndPlan != 'Customized') {
    //     rcmndPLan = 'Business';
    //   }
    // }

    function turnQuestion(question) {
      question.classList.remove('interactive-widget__body--active');
      question.nextElementSibling.classList.add('interactive-widget__body--active');
    }

    radioBtns.forEach((btn)=>{
      btn.addEventListener('click', ()=>{
        const question = btn.parentNode.parentNode.parentNode;
        if (question.nextElementSibling.nextElementSibling) {
          readAnswers();
          // recommender();
          turnQuestion(question);
        } else {
          readAnswers();
          turnQuestion(question);
          this.#element.querySelector('.interactive-widget__header h3').innerHTML ='Dein Tarif:<br>'+ rcmndPlan;
          console.log(questionary);
          console.log(questionaryContent);
          // const form = this.#element.querySelectorAll('[type="radio"]');
          // console.log(form);
          // for (const aaa of form) {
          //   console.log(aaa.checked);
          // }
          // const formData = new FormData(form);
          // console.log(formData);
        }
      });
    });
  }
}

export default CsatComp;
