(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['merchantPageTitle.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"header-section-merchant-page-title\">\n    <div class=\"flex-container-merchant-page-title\">\n        <div class=\"flex-item-merchant-page-title\">\n            <div class=\"list-container-merchant-page-title\">\n                <div class=\"list-item-merchant-page-title\">\n                    <div class=\"link-merchant-page-title text-underline-hover cursor-hand-hover\" href=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"urlMainPage") || (depth0 != null ? lookupProperty(depth0,"urlMainPage") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"urlMainPage","hash":{},"data":data,"loc":{"start":{"line":6,"column":103},"end":{"line":6,"column":118}}}) : helper)))
    + "\"\n                        data-url=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"urlMainPage") || (depth0 != null ? lookupProperty(depth0,"urlMainPage") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"urlMainPage","hash":{},"data":data,"loc":{"start":{"line":7,"column":34},"end":{"line":7,"column":49}}}) : helper)))
    + "\">Главная</div>\n                    <div class=\"separator-merchant-page-title\">·</div>\n                </div>\n                <div class=\"list-item-merchant-page-title user-name-merchant-page-title\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"userName") || (depth0 != null ? lookupProperty(depth0,"userName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"userName","hash":{},"data":data,"loc":{"start":{"line":10,"column":89},"end":{"line":10,"column":101}}}) : helper)))
    + "</div>\n            </div>\n        </div>\n    </div>\n</div>";
},"useData":true});
})();