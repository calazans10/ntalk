var express = require('express');
var load = require('express-load');
var engine = require('ejs-locals');
var app = express();

app.engine('ejs', engine);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.cookieParser('ntalk'));
app.use(express.session());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(__dirname + '/public'));

load('models')
  .then('controllers')
  .then('routes')
  .into(app);

app.listen(3000, function() {
  console.log('Ntalk no ar');
})