Stache
------
Stache is mustache.js for your node express apps.

![stache](http://f.cl.ly/items/1C3o2G3a121b1W1h0L1o/draft_lens8690031module75775171photo_1261762807mustacheold.jpg)

Whuuuuuut?
=========-

Getting this junk running is SUPER easy! check the deets below...

setting it up
-------------

first, the usual...

    npm install stache

Now, when you're configing your express app, just add this little code in somewhere near the top:

    app.set('view engine', 'mustache')
    app.register(".mustache", require('stache'));

*BOOOM!* you're all set!

how to actually use it
----------------------

render your views like usual using res.render:

    app.get('/', function (req, res) {
      res.render("index", {
        locals: {
          title: req.params.what
        },
        partials: {
          heading: '<title>{{title}}</title>'
        }
      });
    });

notice you can pass local vars here as well as partials.


Layouts and Partial magic!!!
----------------------------

Stache supports layouts! swaggg. Which means you can have something like this:

    <!-- layout.mustache -->
    <html>
    <head>
      {{>script}}
    </head>
    <body>
      {{{yield}}}
    </body>
    </html>

Note: yield is a special local var, which will be replaced automatically by the template you specified with res.render.

Double note: Check that partial reference for a script!! If when calling your res.render method you don't explicitly specify a script partial, stache will automatically check your views for a script.mustache to load as a partial. Pretty boss huh?

What? I still don't get it...
-----------------------------

no worries, check the examples folder player for a fully functional example.


shoutout
--------
major props to donpark (hbs) && bitdrift && mustache.js