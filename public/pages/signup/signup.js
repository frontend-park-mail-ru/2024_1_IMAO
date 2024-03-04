'use strict'

import { renderAuthForm } from "../../components/authForm/authForm.js";
import { Ajax } from "../../modules/ajax.js";
import { ROUTES } from "../../routes/routes.js";

const ajax = new Ajax();

export class Signup{
    #parent

    constructor(parent) {
        this.#parent = parent;
    }

    render(){
        this.#renderTamplate();
        this.#addListeners();
    }

    #addListeners(){
        const form = this.#parent.getElementsByClassName('form')[0]
        console.log(form)

        form.addEventListener('submit', (ev) => {
            ev.preventDefault();
        
            const inputs = form.getElementsByTagName('input');
            const email = inputs[0].value.trim();
            const password = inputs[1].value;
            const password_repeat = inputs[2].value;

            ajax.post(
                ROUTES.signup,
                {email, password, password_repeat},
                (body) => {
                    if(body?.session_id) {
                      alert('Успешная Регистрация!');
                      document.cookie = `session_id=${body.session_id}; path=/; expires=${new Date(Date.now() + 1000 * 60 * 10)}`
                      return;
                    }
                    alert('НЕВЕРНЫЙ ЕМЕЙЛ ИЛИ ПАРОЛЬ');
                },
            );
          })
    }    
    
    #renderTamplate(){
        const template = renderAuthForm();
        const title = 'Регистрация в «Волчок»';
        const inputs = [
            {
                type: 'email',
                placeholder: 'Электронная почта',
            },
            {
                type: 'password',
                placeholder: 'Пароль',
            },
            {
                type: 'password',
                placeholder: 'Повтор пароля',
            },
        ];
        const buttonText = 'Зарегистрироваться';
        this.#parent.innerHTML = template({title, inputs, buttonText});
    }
}