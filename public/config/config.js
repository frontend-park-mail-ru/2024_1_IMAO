'use strict';

const api = 'http://127.0.0.1:8080';
export const serverHost = 'http://127.0.0.1:8008';

/**
 * Routes for API.
 */
export const API_ROUTES = {
  AUTH: {
    LOGIN: new URL('/api/auth/login', api),
    CHECKAUTH: new URL('/api/auth/check_auth', api),
    LOGOUT: new URL('/api/auth/logout', api),
    SIGNUP: new URL('/api/auth/signup', api),
  },
  ADVERT: {
    CREATE_ADVERT: new URL('/api/adverts/create', api),
    EDIT_ADVERT: new URL('/api/adverts/edit', api),
    GET_ADS_LIST: new URL('/api/adverts/', api),
    GET_ADS_LIST_BY_CITY: new URL('/api/adverts/:city', api),
    GET_ADS_LIST_BY_CATEGORY: new URL('/api/adverts/:city/:category', api),
    GET_ADVERT: new URL('/api/adverts/:city/:category/:id', api),
    DELETE_ADVERT: new URL('/api/adverts/delete/:id', api),
    CLOSEADVERT: new URL('/api/adverts/close/:id', api),
  },
  PROFILE: {
    GET_PROFILE: new URL('/api/profile/:id', api),
    SET_PROFILE_RATING: new URL('/api/profile/:id/rating', api),
    SET_PROFILE_APPROVED: new URL('/api/profile/approved', api),
    PROFILE_EDIT: new URL('/api/profile/edit', api),
    SET_PROFILE_PHONE: new URL('/api/profile/phone', api),
    SET_PROFILE_AVATAR: new URL('/api/profile/avatar', api),
    SET_PROFILE_CITY: new URL('/api/profile/city', api),
    SET_PROFILE_CITY_BY_ID: new URL('/api/profile/:id/adverts', api),
  },
};

/**
 * Routes for Pages.
 */
export const PAGES_ROUTES = {
  adPage: {
    href: new URL('/:city/:category/:id', serverHost),
    name: 'advert',
    re: new RegExp(/\/[a-zA-Z]+\/[a-zA-Z]+\/\d+$/),
  },
  mainPage: {
    href: new URL('/', serverHost),
    name: 'main',
    re: new RegExp(/\/$/),
  },
  adsListByCity: {
    href: new URL('/:city', serverHost),
    name: 'city',
    re: new RegExp(/\/[a-zA-Z]+(?![\w\/])/g),
  },
  adsListByCategory: {
    href: new URL('/:city/:category', serverHost),
    name: 'category',
    re: new RegExp(/\/[a-zA-Z]+\/[a-zA-Z]+$/),
  },
  loginPage: {
    href: new URL('/login', serverHost),
    name: 'login',
    re: new RegExp(/^\/login$/),
  },
  signupPage: {
    href: new URL('/signup', serverHost),
    name: 'signup',
    re: new RegExp(/^\/signup$/),
  },
};

/**
 * Auth state.
 */
export const AUTH = {
  is_auth: false,
};
