/**
 * Add string to the end of URL path after backslash.
 * @param {URL} path - Path for appending.
 * @param {string} str - String that appends path.
 * @return {URL} - Appended path.
 */
export function appendPath(path, str) {
  const newPathname = path.pathname + '/' + str;
  return new URL(newPathname, path.origin);
}
