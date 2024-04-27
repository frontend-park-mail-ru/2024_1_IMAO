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
    CSRF: new URL('/api/auth/csrf', api),
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
    SET_PROFILE_AVATAR: new URL('/api/profile/edit', api),
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
  SURVEY: {
    CREATE: new URL('/api/survey/create', api),
    CHECK: new URL('/api/survey/check/1', api),
    STATISTICS: new URL('/api/survey/statistics', api),
  },
};

/**
 * Routes for Pages.
 */
export const PAGES_ROUTES = {
  mainPage: {
    href: new URL('/', serverHost),
    name: 'Волчок - доска объявлений',
    re: new RegExp(/\/$/),
  },
  csatPage: {
    href: new URL('/csat', serverHost),
    name: 'Размещение объявления',
    re: new RegExp(/^\/csat$/),
  },
  adCreationPage: {
    href: new URL('/create', serverHost),
    name: 'Размещение объявления',
    re: new RegExp(/^\/create$/),
  },
  adEditingPage: {
    href: new URL('/edit/:id', serverHost),
    name: 'Редактирование объявления - ',
    re: new RegExp(/^\/edit\/\d+$/),
  },
  loginPage: {
    href: new URL('/login', serverHost),
    name: 'Волчок - авторизация',
    re: new RegExp(/^\/login$/),
  },
  signupPage: {
    href: new URL('/signup', serverHost),
    name: 'Волчок - регистрация',
    re: new RegExp(/^\/signup$/),
  },
  cartPage: {
    href: new URL('/cart', serverHost),
    name: 'Волчок - корзина',
    re: new RegExp(/^\/cart$/),
  },
  orderPage: {
    href: new URL('/order', serverHost),
    name: 'Оформление заказа',
    re: new RegExp(/^\/order$/),
  },
  adminPage: {
    href: new URL('/statistics', serverHost),
    name: 'Статистика по опросам',
    re: new RegExp(/^\/stats$/),
  },
  merchantsPage: {
    href: new URL('/merchant/:id', serverHost),
    name: 'Продавец - ',
    re: new RegExp(/^\/merchant+\/\d+$/),
  },
  profilePage: {
    href: new URL('/profile', serverHost),
    name: 'Профиль',
    re: new RegExp(/^\/profile$/),
  },
  profileEdit: {
    href: new URL('/profile/edit', serverHost),
    name: 'Редактирование профиля',
    re: new RegExp(/^\/profile\/edit$/),
  },
  adsListByCity: {
    href: new URL('/:city', serverHost),
    name: 'Волчок - доска объявлений',
    re: new RegExp(/\/[a-zA-Z_]+(?![\w/])/g),
  },
  adsListByCategory: {
    href: new URL('/:city/:category', serverHost),
    name: 'Волчок - доска объявлений',
    re: new RegExp(/\/[a-zA-Z_]+\/[a-zA-Z_]+$/),
  },
  adPage: {
    href: new URL('/:city/:category/:id', serverHost),
    name: 'Объявление - ',
    re: new RegExp(/\/[a-zA-Z_]+\/[a-zA-Z_]+\/\d+$/),
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
    url: new URL('/Moscow/zhenskij_garderob', serverHost),
  },
  {
    name: 'Мужской гардероб',
    translation: 'muzhskoj_garderob',
    url: new URL('/Moscow/muzhskoj_garderob', serverHost),
  },
  {
    name: 'Детский гардероб',
    translation: 'detskij_garderob',
    url: new URL('/Moscow/detskij_garderob', serverHost),
  },
  {
    name: 'Детские товары',
    translation: 'detskie_tovary',
    url: new URL('/Moscow/detskie_tovary', serverHost),
  },
  {
    name: 'Хэндмэйд',
    translation: 'handmade',
    url: new URL('/Moscow/handmade', serverHost),
  },
  {
    name: 'Телефоны и планшеты',
    translation: 'telefony_i_planshety',
    url: new URL('/Moscow/telefony_i_planshety', serverHost),
  },
  {
    name: 'Фото и видеокамеры',
    translation: 'foto_i_videokamery',
    url: new URL('/Moscow/foto_i_videokamery', serverHost),
  },
  {
    name: 'Компьютерная техника',
    translation: 'kompyuternaya_texnika',
    url: new URL('/Moscow/kompyuternaya_texnika', serverHost),
  },
  {
    name: 'ТВ, аудио и видео',
    translation: 'tv_audio_i_video',
    url: new URL('/Moscow/tv_audio_i_video', serverHost),
  },
  {
    name: 'Бытовая техника',
    translation: 'bytovaya_texnika',
    url: new URL('/Moscow/bytovaya_texnika', serverHost),
  },
  {
    name: 'Для дома и дачи',
    translation: 'dlya_doma_i_dachi',
    url: new URL('/Moscow/dlya_doma_i_dachi', serverHost),
  },
  {
    name: 'Стройматериалы и инструменты',
    translation: 'strojmaterialy_i_instrumenty',
    url: new URL('/Moscow/strojmaterialy_i_instrumenty', serverHost),
  },
  {
    name: 'Красота и здоровье',
    translation: 'krasota_i_zdorove',
    url: new URL('/Moscow/krasota_i_zdorove', serverHost),
  },
  {
    name: 'Спорт и отдых',
    translation: 'sport_i_otdyx',
    url: new URL('/Moscow/sport_i_otdyx', serverHost),
  },
  {
    name: 'Хобби и развлечения',
    translation: 'xobbi_i_razvlecheniya',
    url: new URL('/Moscow/xobbi_i_razvlecheniya', serverHost),
  },
  {
    name: 'Прочее',
    translation: 'prochee',
    url: new URL('/Moscow/prochee', serverHost),
  },
];
