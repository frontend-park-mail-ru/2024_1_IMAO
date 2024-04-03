(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['ratingBar.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "            <div class=\"star\"> "
    + ((stack1 = container.lambda(depth0, depth0)) != null ? stack1 : "")
    + " </div>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"rating\">\r\n    <div class=\"rating-value\">"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"ratingValue") || (depth0 != null ? lookupProperty(depth0,"ratingValue") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"ratingValue","hash":{},"data":data,"loc":{"start":{"line":2,"column":30},"end":{"line":2,"column":45}}}) : helper)))
    + "</div>\r\n    <div class=\"rating-stars\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"items") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":4,"column":8},"end":{"line":6,"column":17}}})) != null ? stack1 : "")
    + "    </div>\r\n</div>";
},"useData":true});
})();