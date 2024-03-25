'use strict';

/**
 * List of routes for internal and API requests.
 */
export const ROUTES = {
  main: '/adverts',
  login: '/auth/login',
  logout: '/auth/logout',
  signup: '/auth/signup',
  checkAuth: '/auth/check_auth',
  // mainPage: {
  //   href: '/',
  //   name: 'main',
  // },
  // loginPage: {
  //   href: '/login',
  //   name: 'login',
  // },
  // signupPage: {
  //   href: '/signup',
  //   name: 'signup',
  // },
  // /**
  //  * Init a page render function for route.
  //  * @param {object} route - The object with _Page postfix.
  //  * @param {HTMLElement} render - The rendered page.
  //  */
  // init: (route, render) => {
  //   ROUTES[route].render = render;
  // },
};

/**
 * Auth state.
 */
export const auth = {
  is_auth: false,
};

// const checkAuth = async () => {
//   await ajax.get(
//       ROUTES.checkAuth,
//       (body) => {
//         if (body.isAuth === auth.is_auth) {
//           return;
//         }

//         auth.is_auth = body.isAuth;
//         const headerElement = document.getElementsByTagName('header')[0];
//         const header = new Header(headerElement);
//         header.render();
//       },
//   );
// };

// /**
//  * Router.
//  * @param {string} href - The route to follow.
//  * @param {HTMLElement} parant - The container for a page.
//  */
// const locationResolver = async (href, parant) => {
//   await checkAuth();

//   Object.entries(ROUTES).forEach(([_, route]) => {
//     const location = route?.href;

//     if (location == href) {
//       document.title = route.name;
//       parant.appendChild(route.render());
//     }
//   });
// };

// /**
//  * Changing page via url.
//  * @param {Event} event
//  * @param {HTMLElement} container - The container to render.
//  */
// export function popPage(event, container) {
//   let location = window.location.pathname;

//   if (event?.state) {
//     location = event.state.page;
//   }

//   if (location) {
//     locationResolver(location, container);
//   }
// };

// /**
//  *
//  * @param {*} event
//  * @param {*} href
//  */
// export function pushPage(event, href) {
//   event.preventDefault();
//   history.pushState({page: href}, href, href);
//   const main = document.getElementsByTagName('main')[0];
//   locationResolver(href, main);
// }


