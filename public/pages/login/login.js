'use strict';

import { renderAuthForm } from "../../components/authForm/authForm.js";
import { Ajax } from "../../modules/ajax.js";
import { emailError, passwordError, validateEmail, validatePassword } from "../../modules/validate.js";
import { ROUTES, locationResolver } from "../../routes/routes.js";

const ajax = new Ajax();

const authError = 'Неверный логин или пароль!';

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

            const data = new URLSearchParams();
            const inputs = []
            for (const pair of new FormData(form)) {
                data.append(pair[0], pair[1]);
                inputs.push(pair[1]);
            }

            const email = inputs[0].trim();
            const password = inputs[1];
            console.log(password)

            const divError = this.#parent.getElementsByClassName('error')[0];
            
            if (!validateEmail(email)) {
                divError.innerHTML = emailError;
                return;
            }

            if (!validatePassword(password)) {
                divError.innerHTML = passwordError;
                return;
            }
    
            ajax.post(
                ROUTES.login,
                data,
                (body) => {
                    console.log(body)
                    if(body?.isAuth === true) {
                      alert('Успешная авторизация!')
                      const main = document.getElementsByTagName('main')[0];
                      locationResolver(ROUTES.mainPage.href, main);
                      return;
                    }
                    divError.innerHTML = authError;
                },
            );
          })
    }    
    
    #renderTamplate(){
        const template = renderAuthForm();
        const title = 'Вход в «Волчок»';
        const inputs = [
            {
                name: 'email',
                type: 'email',
                placeholder: 'Электронная почта',
            },
            {
                name: 'password',
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