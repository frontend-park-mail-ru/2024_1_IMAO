const Handlebars = require('handlebars/runtime');

Handlebars.registerHelper('is_null', function(value) {
  return value === '';
});

Handlebars.registerHelper('is_equal', function(val1, val2) {
  return val1 == val2;
});

Handlebars.registerHelper('above_zero', function(value) {
  return value > 0;
});

Handlebars.registerHelper('less_than_zero', function(value) {
  return value < 0;
});

module.exports = Handlebars;
