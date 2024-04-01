'use strict';

const api = 'http://localhost:8080/api';

/**
 * Routes for API.
 */
export const API_ROUTES = {
  main: new URL('/api/adverts/', api),
  login: new URL('/api/auth/login', api),
  logout: new URL('/api/auth/logout', api),
  signup: new URL('/api/auth/signup', api),
  checkAuth: new URL('/api/auth/check_auth', api),
  getProfile: new URL('/api/profile/:id', api),
  getProfile1: new URL('/api/profile/1', api)
};

// export const API_ROUTES = {
//   main: '/api/adverts/',
//   login: '/api/auth/login',
//   logout: '/api/auth/logout',
//   signup: '/api/auth/signup',
//   checkAuth: '/api/auth/check_auth',
//   getProfile: '/api/profile/:id',
//   getProfile1: '/api/profile/1'
// };

export const API = {
  AUTH: {
      LOGIN: new URL('/api/auth/login', api),
      CHECKAUTH: new URL('/api/auth/check_auth', api),
      LOGOUT: new URL('/api/auth/logout', api),
      SIGNUP: new URL('/api/auth/signup', api)
  },
  ADVERT: {
      CREATE_ADVERT: new URL('/api/adverts/create', api),
      EDIT_ADVERT: new URL('/api/adverts/edit', api),
      GET_ADS_LIST: new URL('/api/adverts/', api),
      GET_ADS_LIST_BY_CITY: new URL('/api/adverts/:city', api),
      GET_ADS_LIST_BY_CITY_CATEGORY: new URL('/api/adverts/:city/:category', api),
      GET_ADVERT: new URL('/api/adverts/:city/:category/:id', api), 
      DELETE_ADVERT: new URL('/api/adverts/delete/:id', api),
      CLOSEADVERT: new URL('/api/adverts/close/:id', api)
  },
  PROFILE: {
      GET_PROFILE: new URL('/api/profile/:id', api),
      SET_PROFILE_RATING: new URL('/api/profile/:id/rating', api),
      SET_PROFILE_APPROVED: new URL('/api/profile/approved', api),
      PROFILE_EDIT: new URL('/api/profile/edit', api),
      SET_PROFILE_PHONE: new URL('/api/profile/phone', api),
      SET_PROFILE_AVATAR: new URL('/api/profile/avatar', api),
      SET_PROFILE_CITY: new URL('/api/profile/city', api),
      SET_PROFILE_CITY_BY_ID: new URL('/api/profile/:id/adverts', api)
  },
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
  merchantsPage: {
    href: '/merchant',
    name: 'merchant',
  },
};

/**
 * Auth state.
 */
export const AUTH = {
  is_auth: false,
};
