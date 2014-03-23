var express = require('express');
var app = express();
var load = require('express-load');
var error = require('./middleware/error');
var engine = require('ejs-locals');

app.engine('ejs', engine);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.cookieParser('ntalk'));
app.use(express.session());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(__dirname + '/public'));
app.use(error.notFound);
app.use(error.serverError);

load('models')
  .then('controllers')
  .then('routes')
  .into(app);

app.listen(3000, function() {
  console.log('Ntalk no ar');
})
