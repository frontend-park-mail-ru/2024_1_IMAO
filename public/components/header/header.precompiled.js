(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['header.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "        <div class=\"dropdown\">\n            <img class=\"profile-icon\" src=\"img_avatar.png\">\n            <div class=\"dropdown-content dropdown-content-right\">\n                <a href=\"#\">Профиль</a>\n                <a href=\"#\" class=\"logout\">Выйти</a>\n            </div>\n        </div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <a class=\"btn-secondary\" href=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"urlLogin") || (depth0 != null ? lookupProperty(depth0,"urlLogin") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"urlLogin","hash":{},"data":data,"loc":{"start":{"line":31,"column":39},"end":{"line":31,"column":51}}}) : helper)))
    + "\" data-url=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"urlLogin") || (depth0 != null ? lookupProperty(depth0,"urlLogin") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"urlLogin","hash":{},"data":data,"loc":{"start":{"line":31,"column":63},"end":{"line":31,"column":75}}}) : helper)))
    + "\">Войти</a>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"navbar\">\n    <img class=\"logo\" src=\"vol4ok.svg\">	\n    <a class=\"name\">ВОЛЧОК</a>\n	\n    <div class=\"dropdown\">\n        <button class=\"dropbtn\">\n            <i class=\"fa fa-list-ul\"></i>\n	    Категории\n        </button>\n        <div class=\"dropdown-content\">\n            <a href=\"#\">Link 1</a>\n            <a href=\"#\">Link 2</a>\n            <a href=\"#\">Link 3</a>\n        </div>\n    </div>\n    <form class=\"search\">\n        <i class=\"fa fa-search\"></i>\n        <input type=\"text\" placeholder=\"Поиск по объявлениям\" name=\"search\">\n	<button type=\"submit\">Найти</button>\n    </form>\n    <a class=\"btn-primary\" href=\"#\" >Разместить объявление</a>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"flag") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":22,"column":4},"end":{"line":32,"column":11}}})) != null ? stack1 : "")
    + "</div> \n";
},"useData":true});
})();