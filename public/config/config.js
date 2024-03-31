'use strict';

const api = 'http://127.0.0.1:8080';

/**
 * Routes for API.
 */
export const API_ROUTES = {
  main: new URL('/api/adverts/', api),
  adPage: new URL('/api/adverts/Moskva/Test/1', api),
  login: new URL('/api/auth/login', api),
  logout: new URL('/api/auth/logout', api),
  signup: new URL('/api/auth/signup', api),
  checkAuth: new URL('/api/auth/check_auth', api),
};

/**
 * Routes for Pages.
 */
export const PAGES_ROUTES = {
  mainPage: {
    href: '/',
    name: 'main',
  },
  loginPage: {
    href: '/login',
    name: 'login',
  },
  signupPage: {
    href: '/signup',
    name: 'signup',
  },
  adPage: {
    href: '/advert',
    name: 'advert',
  },
};

/**
 * Auth state.
 */
export const AUTH = {
  is_auth: false,
};
