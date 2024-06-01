'use strict';

import {getCookie, setCookie} from './cookie';
import ajax from './ajax';

/**
 * Set user location if user agree.
 * @param {Position} pos - User position.
 */
export function setLocationSuccess(pos) {
  const exists = getCookie('location') !== null;

  if (exists) {
    return;
  }

  const crd = pos.coords;
  const lat = crd.latitude;
  const lon = crd.longitude;
  const language = 'en';

  const data = {lat, lon, language};

  ajax.post(ajax.routes.CITY.GET_CITY_NAME, data, (body) => {
    if (body.items) {
      const city = body.items.cityName;
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + 1);
      const options = {
        'expires': currentDate,
        'path': '/',
      };

      setCookie('location', city, options);
    }
  });
}

/**
 * Set geolocation to default if user disagree.
 * @param {PositionError} err - Geolocation error.
 */
export function setLocationErr(err) {
  if (err.code !== 1) {
    return;
  }

  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1);
  const options = {
    'expires': currentDate,
    'path': '/',
  };

  setCookie('location', 'Moscow', options);
}
