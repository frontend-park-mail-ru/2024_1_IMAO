'use strict';

/**
 * Routes for API.
 */
export const API_ROUTES = {
  api: 'http://127.0.0.1:8080/api',
  main: '/adverts',
  login: '/auth/login',
  logout: '/auth/logout',
  signup: '/auth/signup',
  checkAuth: '/auth/check_auth',
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
};

/**
 * Auth state.
 */
export const AUTH = {
  is_auth: false,
};
