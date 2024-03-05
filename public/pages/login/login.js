'use strict';

import { renderAuthForm } from "../../components/authForm/authForm.js";
import { Ajax } from "../../modules/ajax.js";
import { ROUTES, locationResolver } from "../../routes/routes.js";

const ajax = new Ajax();

export class Login{
    #parent;

    constructor(parent) {
        this.#parent = parent;
    }

    render(){
        this.#renderTamplate();
        this.#addListeners();
    }

    #addListeners(){
        const form = this.#parent.getElementsByClassName('form')[0]
        const anchor = this.#parent.getElementsByTagName('a')[0]

        anchor.addEventListener('click', (ev) => {
            const main = document.getElementsByTagName('main')[0];
            locationResolver(anchor.dataset.url, main);
        })


        form.addEventListener('submit', (ev) => {
            ev.preventDefault();
        
            const inputs = form.getElementsByTagName('input');
            const email = inputs[0].value.trim();
            const password = inputs[1].value;
    
            ajax.post(
                ROUTES.login,
                {email, password},
                (body) => {
                    if(body?.session_id) {
                      alert('Успешная авторизация!');
                      document.cookie = `session_id=${body.session_id}; path=/; expires=${new Date(Date.now() + 1000 * 60 * 10)}`;
                      const main = document.getElementsByTagName('main')[0];
                      locationResolver(ROUTES.mainPage.href, main);
                      return;
                    }
                    alert('НЕВЕРНЫЙ ЕМЕЙЛ ИЛИ ПАРОЛЬ');
                },
            );
          })
    }    
    
    #renderTamplate(){
        const template = renderAuthForm();
        const title = 'Вход в «Волчок»';
        const inputs = [
            {
                type: 'email',
                placeholder: 'Электронная почта',
            },
            {
                type: 'password',
                placeholder: 'Пароль',
            },
        ];
        const buttonText = 'Войти';
        const url = ROUTES.signupPage.href;
        const askText = 'Нет аккаунта?';
        const anchorText = 'Зарегистрируйтесь';
        this.#parent.innerHTML = template({title, inputs, buttonText, url, askText, anchorText});
    }
}