'use strict'

export function FormatDate(isoString) {
    const date = new Date(isoString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    let dateString = new Intl.DateTimeFormat('ru-RU', options).format(date);
    return dateString.replace(/ г\.$/, '');
}