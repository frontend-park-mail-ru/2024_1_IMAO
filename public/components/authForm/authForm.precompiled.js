(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['authForm.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <div class=\"form-input\">\n        <input type=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"type") : depth0), depth0))
    + "\" placeholder=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"placeholder") : depth0), depth0))
    + "\">\n    </div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"signup\">\n    <div class=\"signup-info\">\n<h2 class=\"form-h2\">Войдите, чтобы использовать все возможности</h2>\n<ul class=\"labels-group\">\n    <li class=\"labeled-icon\">\n    <div class=\"icon\">\n        <svg width=\"28\" height=\"28\" viewBox=\"0 0 28 29\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n    <g clip-path=\"url(#clip0_2019_74)\">\n        <path d=\"M14 4.44C20.32 4.44 25.5 8.88 25.5 14.44C25.5 20 20.32 24.44 14 24.44C12.645 24.44 11.322 24.236 10.076 23.843C8.67402 25.149 6.61802 25.837 3.95202 25.941C3.70782 25.9506 3.46524 25.8975 3.24729 25.787C3.02935 25.6764 2.84327 25.512 2.70672 25.3094C2.57017 25.1067 2.48768 24.8725 2.46708 24.629C2.44648 24.3855 2.48845 24.1407 2.58902 23.918C3.50002 21.903 4.00202 20.42 4.10302 19.539C3.06202 18.013 2.50002 16.263 2.50002 14.44C2.50002 8.88 7.68002 4.44 14 4.44ZM14 6.44C8.72202 6.44 4.50002 10.059 4.50002 14.44C4.50002 15.948 4.99702 17.395 5.92602 18.653C6.054 18.826 6.12274 19.0358 6.12202 19.251C6.11802 20.298 5.67202 21.818 4.79202 23.878C6.77902 23.67 8.18002 23.047 9.03702 22.041C9.17035 21.8849 9.34849 21.7736 9.54726 21.7223C9.74602 21.6709 9.95576 21.682 10.148 21.754C11.35 22.204 12.654 22.44 14 22.44C19.278 22.44 23.5 18.821 23.5 14.44C23.5 10.059 19.278 6.44 14 6.44Z\" fill=\"#99A2AD\"/>\n    </g>\n    <defs>\n        <clipPath id=\"clip0_2019_74\">\n        <rect width=\"30\" height=\"30\" fill=\"white\" transform=\"translate(0 0.940002)\"/>\n        </clipPath>\n    </defs>\n        </svg>\n    </div>\n    <span class=\"text-secondary icon-text\">Общение об объявлениях в чатах</span>\n    </li>\n    <li class=\"labeled-icon\">\n    <div class=\"icon\">\n        <svg width=\"28\" height=\"28\" viewBox=\"0 0 28 29\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n    <g clip-path=\"url(#clip0_2011_153)\">\n        <path d=\"M14 2.18994C20.627 2.18994 26 7.56294 26 14.1899C26 20.8169 20.627 26.1899 14 26.1899C7.373 26.1899 2 20.8169 2 14.1899C2 7.56294 7.373 2.18994 14 2.18994ZM14 4.18994C8.477 4.18994 4 8.66694 4 14.1899C4 19.7129 8.477 24.1899 14 24.1899C19.523 24.1899 24 19.7129 24 14.1899C24 8.66694 19.523 4.18994 14 4.18994ZM15.673 8.68994C16.6444 8.68994 17.5759 9.07581 18.2628 9.76266C18.9496 10.4495 19.3355 11.3811 19.3355 12.3524C19.3355 13.3238 18.9496 14.2554 18.2628 14.9422C17.5759 15.6291 16.6444 16.0149 15.673 16.0149L13.215 16.0139V17.4169H14.852C15.0691 17.4169 15.2773 17.5032 15.4308 17.6567C15.5843 17.8102 15.6705 18.0184 15.6705 18.2354C15.6705 18.4525 15.5843 18.6607 15.4308 18.8142C15.2773 18.9677 15.0691 19.0539 14.852 19.0539L13.215 19.0529V19.8329C13.215 20.0602 13.1247 20.2782 12.964 20.4389C12.8033 20.5997 12.5853 20.6899 12.358 20.6899H12.218C11.9907 20.6899 11.7727 20.5997 11.612 20.4389C11.4513 20.2782 11.361 20.0602 11.361 19.8329L11.36 19.0529H10.488C10.2711 19.0529 10.063 18.9668 9.90959 18.8134C9.75618 18.66 9.67 18.4519 9.67 18.2349C9.67 18.018 9.75618 17.8099 9.90959 17.6565C10.063 17.5031 10.2711 17.4169 10.488 17.4169H11.36V16.0139H10.527C10.2999 16.0139 10.0821 15.9238 9.92136 15.7633C9.76067 15.6028 9.67027 15.3851 9.67 15.1579V15.0019C9.67 14.5279 10.054 14.1449 10.527 14.1449L11.36 14.1439V9.54694C11.36 9.07394 11.745 8.68994 12.218 8.68994H15.673ZM15.709 10.4039H13.215V14.1439H15.709C16.205 14.1439 16.6806 13.9469 17.0313 13.5962C17.382 13.2455 17.579 12.7699 17.579 12.2739C17.579 11.778 17.382 11.3023 17.0313 10.9517C16.6806 10.601 16.205 10.4039 15.709 10.4039Z\" fill=\"#99A2AD\"/>\n    </g>\n    <defs>\n        <clipPath id=\"clip0_2011_153\">\n        <rect width=\"30\" height=\"30\" fill=\"white\" transform=\"translate(0 0.189941)\"/>\n        </clipPath>\n    </defs>\n        </svg>\n    </div>\n    <span class=\"text-secondary icon-text\">Бесплатное размещение объявлений</span>\n    </li>\n    <li class=\"labeled-icon\">\n    <div class=\"icon\">\n        <svg width=\"28\" height=\"29\" viewBox=\"0 0 28 29\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n    <path d=\"M13.484 2.19192C13.834 2.14192 14.166 2.14192 14.516 2.19192C14.861 2.24192 15.149 2.31892 15.812 2.53992L22.632 4.81292C23.0304 4.94562 23.3769 5.20035 23.6225 5.54102C23.868 5.88168 24.0001 6.29099 24 6.71092V15.9899C24 20.7839 21.122 24.4569 15.542 26.9319L15.174 27.0919C14.8027 27.2498 14.4034 27.3312 14 27.3312C13.5966 27.3312 13.1973 27.2498 12.826 27.0919C7.007 24.6199 4 20.8919 4 15.9899V6.70992C4.00011 6.29016 4.13229 5.88108 4.37781 5.54061C4.62333 5.20015 4.96975 4.94556 5.368 4.81292L12.376 2.47792C12.909 2.30392 13.173 2.23592 13.484 2.19192ZM14.234 4.17192C14.0792 4.14877 13.9218 4.14877 13.767 4.17192C13.567 4.19992 13.378 4.25192 12.82 4.43692L6 6.71092V15.9899C6 20.0059 8.471 23.0679 13.609 25.2509C13.859 25.3579 14.141 25.3579 14.384 25.2549L14.738 25.1009C19.641 22.9259 22 19.9159 22 15.9899V6.70992L15.023 4.38492C14.8042 4.30801 14.5812 4.24391 14.355 4.19292L14.233 4.17192H14.234Z\" fill=\"#99A2AD\"/>\n    <path d=\"M19.057 11.383C18.8695 11.1955 18.6152 11.0902 18.35 11.0902C18.0848 11.0902 17.8305 11.1955 17.643 11.383L12.75 16.276L10.857 14.383C10.6684 14.2008 10.4158 14.1 10.1536 14.1023C9.89141 14.1046 9.64059 14.2098 9.45519 14.3952C9.26978 14.5806 9.16461 14.8314 9.16233 15.0936C9.16005 15.3558 9.26085 15.6084 9.443 15.797L12.043 18.397C12.2305 18.5845 12.4848 18.6898 12.75 18.6898C13.0152 18.6898 13.2695 18.5845 13.457 18.397L19.057 12.797C19.2445 12.6095 19.3498 12.3552 19.3498 12.09C19.3498 11.8248 19.2445 11.5705 19.057 11.383Z\" fill=\"#99A2AD\"/>\n        </svg>\n    </div>\n    <span class=\"text-secondary icon-text\">Покупки со скидкой по безопасной сделке</span>\n    </div>\n</li>\n</ul>      <div class=\"signup-main\">\n<h1 class=\"form-h1\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":46,"column":20},"end":{"line":46,"column":29}}}) : helper)))
    + "</h1>\n<form class=\"form\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"inputs") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":48,"column":4},"end":{"line":52,"column":13}}})) != null ? stack1 : "")
    + "<button type=\"submit\" class=\"btn-primary\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"buttonText") || (depth0 != null ? lookupProperty(depth0,"buttonText") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"buttonText","hash":{},"data":data,"loc":{"start":{"line":53,"column":42},"end":{"line":53,"column":56}}}) : helper)))
    + "</button>\n<p class=\"label\">Есть аккаунт? <a href=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"url") || (depth0 != null ? lookupProperty(depth0,"url") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data,"loc":{"start":{"line":54,"column":40},"end":{"line":54,"column":47}}}) : helper)))
    + "\" data-url=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"url") || (depth0 != null ? lookupProperty(depth0,"url") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data,"loc":{"start":{"line":54,"column":59},"end":{"line":54,"column":66}}}) : helper)))
    + "\">Авторизируйтесь</a></p>\n</form>\n</div>\n</div>";
},"useData":true});
})();