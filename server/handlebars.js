const Handlebars = require('handlebars/runtime');

Handlebars.registerHelper('is_null', function(value) {
  return value === '';
});

Handlebars.registerHelper('is_equal', function(val1, val2) {
  return val1 == val2;
});

module.exports = Handlebars;
