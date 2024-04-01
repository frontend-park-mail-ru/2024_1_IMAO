'use strict';

const api = 'http://127.0.0.1:8080';

/**
 * Routes for API.
 */
export const API_ROUTES = {
  main: new URL('/api/adverts/', api),
  login: new URL('/api/auth/login', api),
  logout: new URL('/api/auth/logout', api),
  signup: new URL('/api/auth/signup', api),
  checkAuth: new URL('/api/auth/check_auth', api),
  cartList: new URL('/api/cart/list', api),
  cartAppend: new URL('/api/cart/append', api),
  cartDelete: new URL('/api/cart/delete', api),
};

/**
 * Routes for Pages.
 */
export const PAGES_ROUTES = {
  mainPage: {
    href: '/',
    name: 'Волчок - доска объявлений',
  },
  loginPage: {
    href: '/login',
    name: 'Волчок - вход',
  },
  signupPage: {
    href: '/signup',
    name: 'Волчок - регистрация',
  },
  cartPage: {
    href: '/cart',
    name: 'Волчок - корзина',
  },
};

/**
 * Auth state.
 */
export const AUTH = {
  is_auth: false,
};
