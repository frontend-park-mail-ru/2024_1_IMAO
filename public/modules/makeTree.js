'use strict'

import { Ajax } from "./ajax.js";

const ajax = new Ajax();

export class MakeTree{
    /**
     * Функция, разворачивающая элементы HTML на страницу из конфига
     * @param {HTMLElement} parent Родительский элеент, куда помещаются элементы
     * @param {object} config Конфиг с описанием элементов HTML
     */
    makeTree(parent, toWrite, config) {
        for (const child in config) {
            const element = document.createElement(config[child].tagName);

            for (const property in config[child]) {

                if (
                    typeof property != 'object' &&
                    property != "tagName"
                    ){
                    element[property] = config[child][property];
                    continue
                }

                this.makeTree(element, toWrite, config[child]);
            }

            parent.appendChild(element)

            element.addEventListener('click', (ev) => {

                let flag = false;

                ajax.get(
                    "/check_auth",
                    (body) => {
                        console.log(body)
                        
                        if (body.is_auth === true){
                            flag = true;
                        }

                        if (flag && (element.name == "login" || element.name == "signup")) {
                            const render = config.logo.render();
                            toWrite.appendChild(render);
                        }
                        else {
                        const render = config[element.name]?.render?.();
                    
                        if (typeof render != 'undefined') {
                            toWrite.appendChild(render);
                        }
                        }
                    },
                );
                
                

            });
        }
    }

}