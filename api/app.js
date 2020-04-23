var express = require('express');
var createError = require('http-errors');
var bodyParser = require('body-parser')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var cors = require("cors");
var http = require('http');
const helmet = require('helmet')
const compression = require('compression')
const rateLimit = require('express-rate-limit')
const { body, check } = require('express-validator')
var cookie = require('cookie');


var app = express();

// cors
const isProduction = process.env.NODE_ENV === 'production'
const origin = {
  origin: isProduction ? 'https://virtualcoffeeshop.herokuapp.com' : '*',
}
app.use(cors(origin))

// connect with client
app.use(express.static(path.join(__dirname, 'client/build')));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

// compression and helmet
app.use(compression())
app.use(helmet())

// routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var cafeRouter = require('./routes/cafe');
app.use('/api', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/cafe', cafeRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


const port = process.env.PORT || 3001
var serve = http.createServer(app);
var io = require('socket.io')(serve);

serve.listen(port, function() {
    console.log('Express server listening on port ' + port);
});

let roomsList = {}

io.on('connection', (client) => {

  client.on('cafe_login', (msg) => {
    roomName = "cafe" + msg.cafe.id
    console.log('cafe_login', roomName)

    if (!(roomName in roomsList)) {
      roomsList[roomName] = new Set()
    }

    capacity = msg.cafe.capacity
    numClients = roomsList[roomName].size

    console.log("Capacity: ", capacity)

    // if capacity full
    if (numClients === capacity) {
      client.emit('roomfull', {
        message: 'Room Full',
        cafe: msg.cafe
      })
    }
    else {
      roomsList[roomName].add(client.id)

     // emit just for each client
      client.emit('me_joined', {
        socketId: client.id,
        username: msg.username,
        numClients: roomsList[roomName].size
      });

      // emit for all clients to know
      io.sockets.emit('joined', {
        socketId: client.id,
        username: msg.username,
        numClients: roomsList[roomName].size
      });
    }

  });


  client.on('cafe_logout', (msg) => {

    roomName = "cafe" + msg.cafe.id
    console.log('cafe_logout', roomName)

    if (Object.keys(roomsList).length == 0) {
      console.log("TODO deal with this situation")
      // soft error/return... for now...
      return
    }

    numClients = roomsList[roomName].size
    roomsList[roomName].delete(msg.socketId)

    io.sockets.emit('leaving', {
      socketId: client.id,
      numClients: roomsList[roomName].size
    });

  });


  io.clients((error, clients) => {
    if (error) throw error;
    // console.log("CLIENTS", clients); 
  });

  client.on("disconnect", () => {
    console.log("Client disconnected")

    for (var key in roomsList) {
      if (roomsList.hasOwnProperty(key)) {           
          console.log(key, roomsList[key]);
          roomsList[key].delete(client.id)
      }
    }
  });
});


// rate limiting
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20, // 20 requests,
})

app.use(limiter)


module.exports = app;


