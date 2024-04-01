export const API = {
  AUTH: {
    LOGIN: '/api/auth/login',
    CHECKAUTH: '/api/auth/check_auth',
    LOGOUT: '/api/auth/logout',
    SIGNUP: '/api/auth/signup',
  },
  ADVERT: {
    CREATE_ADVERT: '/api/adverts/create',
    EDIT_ADVERT: '/api/adverts/edit',
    GET_ADS_LIST: '/api/adverts/',
    GET_ADS_LIST_BY_CITY: '/api/adverts/:city',
    GET_ADS_LIST_BY_CITY_CATEGORY: '/api/adverts/:city/:category',
    GET_ADVERT: '/api/adverts/:city/:category/:id',
    DELETE_ADVERT: '/api/adverts/delete/:id',
    CLOSEADVERT: '/api/adverts/close/:id',
  },
  PROFILE: {
    GET_PROFILE: '/api/profile/:id',
    SET_PROFILE_RATING: '/api/profile/:id/rating',
    SET_PROFILE_APPROVED: '/api/profile/approved',
    PROFILE_EDIT: '/api/profile/edit',
    SET_PROFILE_PHONE: '/api/profile/phone',
    SET_PROFILE_AVATAR: '/api/profile/avatar',
    SET_PROFILE_CITY: '/api/profile/city',
    SET_PROFILE_CITY_BY_ID: '/api/profile/:id/adverts',
  },
};
