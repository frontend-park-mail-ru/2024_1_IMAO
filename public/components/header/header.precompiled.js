(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['header.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "      <a class=\"btn-secondary\" href=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"urlLogin") || (depth0 != null ? lookupProperty(depth0,"urlLogin") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"urlLogin","hash":{},"data":data,"loc":{"start":{"line":21,"column":37},"end":{"line":21,"column":49}}}) : helper)))
    + "\" data-url=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"urlLogin") || (depth0 != null ? lookupProperty(depth0,"urlLogin") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"urlLogin","hash":{},"data":data,"loc":{"start":{"line":21,"column":61},"end":{"line":21,"column":73}}}) : helper)))
    + "\">Войти</a>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "       <div class=\"dropdown\">\n        <img class=\"profile-icon\" src=\"img_avatar.png\">\n        <div class=\"dropdown-content dropdown-content-right\">\n        <a href=\"#\">Профиль</a>\n        <a href=\"#\">Выйти</a>\n        </div>\n       </div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"navbar\">\n    \n       <a class=\"brand\" href=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"urlMain") || (depth0 != null ? lookupProperty(depth0,"urlMain") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"urlMain","hash":{},"data":data,"loc":{"start":{"line":3,"column":30},"end":{"line":3,"column":41}}}) : helper)))
    + "\" data-url=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"urlMain") || (depth0 != null ? lookupProperty(depth0,"urlMain") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"urlMain","hash":{},"data":data,"loc":{"start":{"line":3,"column":53},"end":{"line":3,"column":64}}}) : helper)))
    + "\">\n        <img class=\"logo\"  src=\"vol4ok.svg\">\n        <span class=\"name\">ВОЛЧОК</span>\n        </a>\n       \n      <div class=\"dropdown\">\n	<button class=\"dropbtn\">Категории\n	  <i class=\"fa fa-caret-down\"></i>\n	</button>\n	<div class=\"dropdown-content\">\n	  <a href=\"#\">Link 1</a>\n	  <a href=\"#\">Link 2</a>\n	  <a href=\"#\">Link 3</a>\n	</div>\n      </div>\n      <input type=\"text\" placeholder=\"Search..\">\n      <a class=\"btn-primary\" href=\"#\" >Разместить объявление</a>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"flag") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":20,"column":6},"end":{"line":30,"column":14}}})) != null ? stack1 : "")
    + "    </div> ";
},"useData":true});
})();