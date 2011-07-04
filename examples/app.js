// module depencies
var express = require('express')
  , app = express.createServer();

// config
app.set('view engine', 'mustache')
app.set("views", __dirname + '/views');
app.register(".mustache", require('stache'));
app.use(express.static(__dirname + '/public'));

// helpers
app.helpers({
  helloworld: function(req, res){
    return 'hello world';
  }
});

// dynamicHelpers
app.dynamicHelpers({
  hellopage: function(req, res){
    return req.url;
  }
});

// routes
app.get('/', function (req, res) {
  res.render('index', {
    locals: {
      title: 'Welcome'
    }
  , partials: {
      img: '<img src="http://cl.ly/5Wd3/draft_lens8690031module75775171photo_1261762807mustacheold.jpg" />'
    }
  });
});

app.get('/user/:name', function (req, res) {
  res.render(req.params.name, {
    locals: {
      title: req.params.name + '\'s page'
    , name: req.params.name
    , message: 'stache it in your stache!'
    }
  });
});

//Run
app.listen(3000);

console.log('example running on port 3000')