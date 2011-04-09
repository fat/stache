/*! written by @fat
 * but major props to donpark && bitdrift && mustache.js
 */
var stache = {}
  , fs = require('fs')
  , mustache = require('mustache')
  , views = '/';

stache.compile = function (source, options) {
  views = (options && options.settings && options.settings.views) || './views';
  if (typeof source == 'string') {
    return function (options) {
      options.locals = options.locals || {};
      options.partials = options.partials || {};

      if (options.body) {
        options.locals.yield = options.body;
      }

      var partials_regex = new RegExp("{{([>-])([^\\/#\\^]+?)\\1?}}+", "g");
      
      var tag_replace_callback = function (match, operator, name) {
        if (operator == '>' && !options.partials[name]) {
          return fs.readFileSync(views + '/' + name + (options.extension || '.mustache'), 'utf-8');
        }
        return match;
      };

      var lines = source.split("\n");
      for (var i = 0; i < lines.length; i++) {
        lines[i] = lines[i].replace(partials_regex, tag_replace_callback, this);
      }

      return mustache.to_html(lines.join('\n'), options.locals, options.partials);
    }
  } else {
    return source;
  }
};

stache.render = function(template, options) {
  template = stache.compile(template, options);
  return template(options);
};

module.exports = stache;
