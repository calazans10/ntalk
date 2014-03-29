var express  = require('express');
var app      = express();
var load     = require('express-load');
var error    = require('./middleware/error');
var engine   = require('ejs-locals');
var server   = require('http').createServer(app)
var io       = require('socket.io').listen(server);

const KEY    = 'ntalk.sid', SECRET = 'ntalk';
var cookie   = express.cookieParser(SECRET);
var store    = new express.session.MemoryStore();
var sessOpts = {secret: SECRET, key: KEY, store: store};
var session  = express.session(sessOpts);

app.engine('ejs', engine);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(cookie);
app.use(session);
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
load('sockets')
  .into(io);

io.set('authorization', function (data, accept) {
  cookie(data, {}, function (err) {
    var sessionID = data.signedCookies[KEY];
    store.get(sessionID, function (err, session) {
      if (err || !session) {
        accept(null, false);
      } else {
        data.session = session;
        accept(null, true);
      };
    });
  });
});

server.listen(3000, function() {
  console.log('Ntalk no ar');
})
