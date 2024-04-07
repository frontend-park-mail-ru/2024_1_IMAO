const monthNames = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
  'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',
];

/**
 * Converts date into an easy-to-read format.
 * @param {string} rawDate - Date in database format.
 * @return {string} - Useful date.
 */
export function convertDate(rawDate) {
  const fullDate = new Date(rawDate);

  const day = fullDate.getDate();
  const month = fullDate.getMonth();
  const year = fullDate.getFullYear();

  return `${day} ${monthNames[month]} ${year}`;
}
