var createError = require('http-errors');
var express = require('express');
const bodyParser = require('body-parser')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var cafeRouter = require('./routes/cafe');

var app = express();


var cors = require("cors");
const isProduction = process.env.NODE_ENV === 'production'
const origin = {
  origin: isProduction ? 'https://virtualcoffeeshop.herokuapp.com' : '*',
}

app.use(cors(origin))

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
app.listen(port, () => {
  console.log(`Server listening at ${port}`)
})


module.exports = app;
