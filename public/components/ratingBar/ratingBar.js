export function renderRatingBarTemplate(ratingValue, items) {
    const template = Handlebars.templates['ratingBar.hbs'];
    return template({ratingValue, items});
  }