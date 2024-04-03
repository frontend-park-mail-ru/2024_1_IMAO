(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['activeSoldSwitch.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <div class=\"ActiveSoldNoSelectedButton\">\r\n            <label class=\"Active\">\r\n                <div class=\"ActiveSoldInsideTextDiv\">\r\n                        <input  type=\"radio\" name=\"radio\"/>\r\n                        <span  class=\"ActiveSoldBlackText\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"categoryLabel") || (depth0 != null ? lookupProperty(depth0,"categoryLabel") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"categoryLabel","hash":{},"data":data,"loc":{"start":{"line":16,"column":59},"end":{"line":16,"column":76}}}) : helper)))
    + " "
    + alias4(((helper = (helper = lookupProperty(helpers,"count") || (depth0 != null ? lookupProperty(depth0,"count") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"count","hash":{},"data":data,"loc":{"start":{"line":16,"column":77},"end":{"line":16,"column":86}}}) : helper)))
    + "</span>\r\n                </div>\r\n            </label>\r\n        </div>\r\n        \r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "\r\n<div class=\"ActiveSoldSwitch\">\r\n    <div class=\"ActiveSoldList\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"items") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":4,"column":8},"end":{"line":21,"column":17}}})) != null ? stack1 : "")
    + "    </div>\r\n</div>\r\n    \r\n\r\n\r\n";
},"useData":true});
})();