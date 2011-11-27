/*! written by @fat and modified by @robmcguinness
 * but major props to donpark && bitdrift && mustache.js
 */
var stache = {};
var fs = require('fs');
var path = require("path");
var mustache = require('mustache');
var views = './views';

stache.compile = function (source, options) {
  views = (options && options.settings && options.settings.views) || views;

  if (typeof source == 'string') {
    return function (options) {
      var partials_regex = new RegExp("{{([>-])(.*?)}}", "g");
      var lines = source.split("\n");
      var i = 0;
      var view;

      function tag_replace_callback(match, operator, name) {
        if (operator == '>' && !options.partials[name]) {
          
          _name = name.replace(/^\s\s*/, '').replace(/\s\s*$/, ''); // trim whitespace

          var partialFileName = views + '/' + _name + (options.extension || '.mustache');
          return path.existsSync(partialFileName) ? fs.readFileSync(partialFileName, "utf-8") : "";
        }
        return match;
      }

      options.partials = options.partials || {};

      if (options.body) {
        options.yield = options.body;
      }

      for (i; i < lines.length; i++) {
        lines[i] = lines[i].replace(partials_regex, tag_replace_callback, this);
      }

      return mustache.to_html(lines.join('\n'), options, options.partials);
    };
  } else {
    return source;
  }
};

stache.render = function(template, options) {
  template = stache.compile(template, options);
  return template(options);
}

module.exports = stache;