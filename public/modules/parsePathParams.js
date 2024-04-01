'use strict';

export function parsePathParams(path, url) {
    const params = {};
    const pathParts = path.split('/');
    const urlParts = url.split('/');
  
    for (let i = 0; i < pathParts.length; i++) {
        const part = pathParts[i];
        if (part.startsWith(':')) {
            const paramName = part.slice(1);
            const paramValue = urlParts[i];
            params[paramName] = paramValue;
        }
    }
  
    return params;
  }

//   // Пример использования
//   const path = '/user/:userId/profile/:section';
//   const url = '/user/123/profile/settings';
  
//   const params = parsePathParams(path, url);
  
//   console.log(params); // Выведет: { userId: '123', section: 'settings' }

export function buildUrl(path, params) {
    let url = path.pathname;
    console.log(url)
    for (const paramName in params) {
        if (params.hasOwnProperty(paramName)) {
            url = url.replace(':' + paramName, params[paramName]);
        }
    }
    path.pathname = url
    const pathDub = path
    return pathDub;
}

// // Пример использования
// const path = '/users/:userId/posts/:postId';

// const params = {
//     userId: '123',
//     postId: '456'
// };

// const url = buildUrl(path, params);

// console.log(url); // Выведет: '/users/123/posts/456'
  