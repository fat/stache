/*! written by @fat
 * but major props to donpark && bitdrift && mustache.js
 */
var stache = {}
  , fs = require('fs')
  , path = require("path")
  , mustache = require('mustache')
  , views = './views'
  , union = function(source){
      var object
        , key
        , l
        , i

        for (i = 1, l = arguments.length; i < l; i++){
          object = arguments[i]
          for (key in object) {
            if (!source.hasOwnProperty(key)) {
              source[key] = object[key]
            }
          }
        }
        return source
}

stache.compile = function (source, options) {
  views = (options && options.settings && options.settings.views) || views

  if (typeof source == 'string') {
    return function (options) {
      var partials_regex = new RegExp("{{([>-])([^\\/#\\^]+?)\\1?}}+", "g")
        , lines = source.split("\n")
        , i = 0
        , view

      function tag_replace_callback(match, operator, name) {
        if (operator == '>' && !options.partials[name]) {
          var partialFileName = views + '/' + name + (options.extension || '.mustache')
          return path.existsSync(partialFileName) ? fs.readFileSync(partialFileName, "utf-8") : ""
        }
        return match
      }

      options.locals = options.locals || {}
      options.partials = options.partials || {}

      if (options.body) {
        options.locals.yield = options.body
      }

      for (i; i < lines.length; i++) {
        lines[i] = lines[i].replace(partials_regex, tag_replace_callback, this)
      }

      view = union({}, options, options.locals)

      return mustache.to_html(lines.join('\n'), view, options.partials)
    }
  } else {
    return source
  }
};

stache.render = function(template, options) {
  template = stache.compile(template, options)
  return template(options)
}

module.exports = stache