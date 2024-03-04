'use strict'

export const CONFIG_HEADER = {
    logo: {
        tagName: 'img',
        name: 'logo',
        src: '/1676327498_grizly-club-p-kartinki-klipart-yula-16.jpg',
        render: 'renderMain',
    },
    categories: {
        tagName: 'button',
        name: 'categories',
        href: '/categories',
        innerHTML: 'Разместить объявление',
        render: 'renderDefault',
    },
    search: {
        tagName: 'form',
        searchField: {
            tagName: 'input',
            type: 'text',
        },
        searchButton: {
            tagName: 'input',
            type: 'submit',
            value: 'Найти',
        }
    },
    create: {
        tagName: 'button',
        name: 'create',
        href: '/create',
        innerHTML: 'Разместить объявление',
        render: 'renderDefault',
    },
    login: {
        tagName: 'button',
        name: 'login',
        href: '/login',
        innerHTML: 'Войти',
        render: 'renderLogin',
    },
    signup: {
        tagName: 'button',
        name: 'signup',
        href: '/signup',
        innerHTML: 'Зарегистрироваться',
        render: 'renderSignup',
    },
};

export function initHeaderConf(config, funcs){
    Object.entries(funcs).forEach(func => {
        for( const element in config){
            if(config[element]?.render == func[0]){
                config[element].render = func[1];
            }
        }
    });
}
