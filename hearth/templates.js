/* This file was automatically generated. */
(function() {
var templates = {};
templates["detail.preview_tray"] = (function() {
function root(env, context, frame, runtime) {
var output = "";
output += "<div class=\"slider\">\n  <ul class=\"content\">";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "previews"));
output += "</ul>\n</div>\n<div class=\"dots\">";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "dots"));
output += "</div>\n";
return output;
}
return {
root: root
};

})();
templates["detail.single_preview"] = (function() {
function root(env, context, frame, runtime) {
var output = "";
output += "<li>\n<a class=\"screenshot thumbnail ";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "typeclass"));
output += "\"\n   href=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "fullUrl"));
output += "\" title=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "caption"));
output += "\">\n  <img alt=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "caption"));
output += "\" src=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "thumbUrl"));
output += "\">\n</a>\n</li>";
return output;
}
return {
root: root
};

})();
templates["errors.fragment"] = (function() {
function root(env, context, frame, runtime) {
var output = "";
output += "<span class=\"fragment_error\">\n<b>";
output += (runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "_")))("Oh no!");
output += "</b><br />\n";
output += (runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "_")))("An error occurred.");
output += "\n</span>";
return output;
}
return {
root: root
};

})();
templates["home.category_tile"] = (function() {
function root(env, context, frame, runtime) {
var output = "";
output += "<li>\n  <a class=\"mkt-tile category\" href=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "url"));
output += "\">\n    <div class=\"icon cat-";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "slug"));
output += "\"></div>\n    <h3 class=\"linefit\">";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "name"));
output += "</h3>\n  </a>\n</li>";
return output;
}
return {
root: root
};

})();
templates["home.featured_app"] = (function() {
function root(env, context, frame, runtime) {
var output = "";
output += "<li>";
output += (runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "market_tile")))(runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "app")),runtime.makeKeywordArgs({"src": "mkt-home"}));
output += "</li>\n";
return output;
}
return {
root: root
};

})();
templates["home.main"] = (function() {
function root(env, context, frame, runtime) {
var output = "";
output += "<section id=\"featured-home\" class=\"featured full\">\n  <ul class=\"grid c\"></ul>\n</section>\n<section class=\"main categories\">\n  <h2>";
output += (runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "_")))("Categories");
output += "</h2>\n  <ul class=\"grid\"></ul>\n</section>\n";
return output;
}
return {
root: root
};

})();
nunjucks.env = new nunjucks.Environment([]);
nunjucks.env.registerPrecompiled(templates);
})()
