const Handlebars = require('handlebars/runtime');

Handlebars.registerHelper('is_null', function(value) {
  return value === '';
});

module.exports = Handlebars;
