(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['authForm.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "      <div class=\"form-input\">\r\n        <input name=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "\" type=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"type") : depth0), depth0))
    + "\" placeholder=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"placeholder") : depth0), depth0))
    + "\">\r\n      </div>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"signup\">\r\n  <div class=\"signup-info\">\r\n    <h2 class=\"form-h2\">Войдите, чтобы использовать все возможности</h2>\r\n    <ul class=\"labels-group\">\r\n      <li class=\"labeled-icon\">\r\n        <div class=\"icon\">\r\n	  <img src=\"cloud.svg\">\r\n        </div>\r\n        <span class=\"text-secondary icon-text\">Общение об объявлениях в чатах</span>\r\n      </li>\r\n      <li class=\"labeled-icon\">\r\n        <div class=\"icon\">\r\n	  <img src=\"ruble.svg\">\r\n        </div>\r\n        <span class=\"text-secondary icon-text\">Бесплатное размещение объявлений</span>\r\n      </li>\r\n      <li class=\"labeled-icon\">\r\n        <div class=\"icon\">\r\n	  <img src=\"shield.svg\">\r\n        </div>\r\n        <span class=\"text-secondary icon-text\">Покупки со скидкой по безопасной сделке</span>\r\n      </li>\r\n    </ul>\r\n  </div>     \r\n  <div class=\"signup-main\">\r\n    <img class=\"logo\" src=\"vol4ok.svg\">\r\n    <h1 class=\"form-h1\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":27,"column":24},"end":{"line":27,"column":33}}}) : helper)))
    + "</h1>\r\n    <form class=\"form\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"inputs") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":29,"column":6},"end":{"line":33,"column":15}}})) != null ? stack1 : "")
    + "      <button type=\"submit\" class=\"btn-primary\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"buttonText") || (depth0 != null ? lookupProperty(depth0,"buttonText") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"buttonText","hash":{},"data":data,"loc":{"start":{"line":34,"column":48},"end":{"line":34,"column":62}}}) : helper)))
    + "</button>\r\n      <p class=\"label\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"askText") || (depth0 != null ? lookupProperty(depth0,"askText") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"askText","hash":{},"data":data,"loc":{"start":{"line":35,"column":23},"end":{"line":35,"column":34}}}) : helper)))
    + " <a href=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"url") || (depth0 != null ? lookupProperty(depth0,"url") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data,"loc":{"start":{"line":35,"column":44},"end":{"line":35,"column":51}}}) : helper)))
    + "\" data-url=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"url") || (depth0 != null ? lookupProperty(depth0,"url") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data,"loc":{"start":{"line":35,"column":63},"end":{"line":35,"column":70}}}) : helper)))
    + "\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"anchorText") || (depth0 != null ? lookupProperty(depth0,"anchorText") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"anchorText","hash":{},"data":data,"loc":{"start":{"line":35,"column":72},"end":{"line":35,"column":86}}}) : helper)))
    + "</a></p>\r\n    </form>\r\n    <div class=\"error\"></div>\r\n  </div>\r\n</div>\r\n";
},"useData":true});
})();