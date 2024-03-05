'use strict';

import { Ajax } from "../../modules/ajax.js";
import { ROUTES, locationResolver, auth } from "../../routes/routes.js";

const ajax = new Ajax();

export class Header{
    #parent;

    constructor(parent) {
        this.#parent = parent;
    }

    render(){
        this.#renderTamplate();
        this.#addListeners();
    }

    #addListeners(){
        const anchors = this.#parent.getElementsByTagName('a');

        for (const anchor of anchors) {
            if (anchor.dataset.url == undefined) {
                continue;
            }

            anchor.addEventListener('click', (ev) => {
                const main = document.getElementsByTagName('main')[0];
                locationResolver(anchor.dataset.url, main);
            })
        }

        const logoutBtn = this.#parent.getElementsByClassName('logout')[0];

        if (logoutBtn === undefined){
            return;
        }

        logoutBtn.addEventListener('click', (ev) => {
            ajax.post(
                ROUTES.logout,
                null,
                (body) => {
                    const main = document.getElementsByTagName('main')[0];
                    locationResolver(ROUTES.mainPage.href, main);
                }
            );
        });


    }    
    
    #renderTamplate(){
        const template = Handlebars.templates['header.hbs'];
        const urlMain = ROUTES.mainPage.href;
        const urlLogin = ROUTES.loginPage.href;
        const flag = auth.is_auth;
        this.#parent.innerHTML = template({urlMain, urlLogin, flag});
    }
}