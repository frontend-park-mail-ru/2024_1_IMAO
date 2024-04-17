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
    GET_ADVERT_BY_ID: new URL('/api/adverts/:id', api),
    DELETE_ADVERT: new URL('/api/adverts/delete/:id', api),
    CLOSE_ADVERT: new URL('/api/adverts/close/:id', api),
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
    EDIT_USER_EMAIL: new URL('/api/auth/edit/email', api),
  },
  CITY: {
    GET_CITY_LIST: new URL('/api/city', api),
  },
  CART: {
    GET_CART_LIST: new URL('/api/cart/list', api),
    CHANGE_CART_ITEM_STATUS: new URL('/api/cart/change', api),
    DELETE_CART_ITEM: new URL('/api/cart/delete', api),
  },
  ORDER: {
    GET_ORDERS_LIST: new URL('/api/order/list', api),
    CREATE_ORDERS: new URL('/api/order/create', api),
  },
};

/**
 * Routes for Pages.
 */
export const PAGES_ROUTES = {
  mainPage: {
    href: new URL('/', serverHost),
    name: 'main',
    re: new RegExp(/\/$/),
  },
  adCreationPage: {
    href: new URL('/create', serverHost),
    name: 'create',
    re: new RegExp(/^\/create$/),
  },
  adEditingPage: {
    href: new URL('/edit/:id', serverHost),
    name: 'edit',
    re: new RegExp(/^\/edit\/\d+$/),
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
  cartPage: {
    href: new URL('/cart', serverHost),
    name: 'cart',
    re: new RegExp(/^\/cart$/),
  },
  orderPage: {
    href: new URL('/order', serverHost),
    name: 'order',
    re: new RegExp(/^\/order$/),
  },
  merchantsPage: {
    href: new URL('/merchant/:id', serverHost),
    name: 'merchant',
    re: new RegExp(/^\/merchant+\/\d+$/),
  },
  profilePage: {
    href: new URL('/profile', serverHost),
    name: 'profile',
    re: new RegExp(/^\/profile$/),
  },
  profileEdit: {
    href: new URL('/profile/edit', serverHost),
    name: 'edit profile',
    re: new RegExp(/^\/profile\/edit$/),
  },
  adsListByCity: {
    href: new URL('/:city', serverHost),
    name: 'city',
    re: new RegExp(/\/[a-zA-Z]+(?![\w/])/g),
  },
  adsListByCategory: {
    href: new URL('/:city/:category', serverHost),
    name: 'category',
    re: new RegExp(/\/[a-zA-Z]+\/[a-zA-Z_]+$/),
  },
  adPage: {
    href: new URL('/:city/:category/:id', serverHost),
    name: 'advert',
    re: new RegExp(/\/[a-zA-Z]+\/[a-zA-Z_]+\/\d+$/),
  },
};

/**
 * Auth state.
 */
export const AUTH = {
  isAuth: false,
};

export const CATEGORIES = [
  {
    name: 'Женский гардероб',
    translation: 'zhenskij_garderob',
  },
  {
    name: 'Мужской гардероб',
    translation: 'muzhskoj_garderob',
  },
  {
    name: 'Детский гардероб',
    translation: 'detskij_garderob',
  },
  {
    name: 'Детские товары',
    translation: 'detskie_tovary',
  },
  {
    name: 'Хэндмэйд',
    translation: 'handmade',
  },
  {
    name: 'Телефоны и планшеты',
    translation: 'telefony_i_planshety',
  },
  {
    name: 'Фото и видеокамеры',
    translation: 'foto_i_videokamery',
  },
  {
    name: 'Компьютерная техника',
    translation: 'kompyuternaya_texnika',
  },
  {
    name: 'ТВ, аудио и видео',
    translation: 'tv_audio_i_video',
  },
  {
    name: 'Бытовая техника',
    translation: 'bytovaya_texnika',
  },
  {
    name: 'Для дома и дачи',
    translation: 'dlya_doma_i_dachi',
  },
  {
    name: 'Стройматериалы и инструменты',
    translation: 'strojmaterialy_i_instrumenty',
  },
  {
    name: 'Красота и здоровье',
    translation: 'krasota_i_zdorove',
  },
  {
    name: 'Спорт и отдых',
    translation: 'sport_i_otdyx',
  },
  {
    name: 'Хобби и развлечения',
    translation: 'xobbi_i_razvlecheniya',
  },
  {
    name: 'Прочее',
    translation: 'prochee',
  },
];
