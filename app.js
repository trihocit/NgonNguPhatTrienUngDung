var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');




var usersRouter = require('./routes/users');

var app = express();

mongoose.connect("mongodb://localhost:27017/c2");
mongoose.connection.on("connected",()=>{
  console.log("Kết nối thành công đến MongoDB");
})
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const cors = require('cors');

// Kích hoạt CORS cho tất cả các domain
app.use(cors());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/roles', require('./routes/roles'));
app.use('/auths', require('./routes/auths'));
app.use('/rooms', require('./routes/rooms'));
app.use('/bookings', require('./routes/bookings'));
app.use('/services', require('./routes/services'));
app.use('/floors', require('./routes/floors'));
app.use('/invoices', require('./routes/invoices'));
app.use('/hotels', require('./routes/hotels'));
app.use('/servicesBills', require('./routes/servicesBills'));
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
  res.send({
    success:false,
    message:err.message
  });
});

module.exports = app;
