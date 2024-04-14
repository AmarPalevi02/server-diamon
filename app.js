const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash');


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {}
}))
app.use(flash());

app.use(methodOverride('_method'))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/adminlte', express.static(path.join(__dirname, '/node_modules/admin-lte')))

const v1 = '/v1'
// route
const userRoute = require('./app/user/router')
const dashboardRoute = require('./app/dashboard/route')
const categoriesRoute = require('./app/categories/router')
const nominalRoute = require('./app/nominal/router')
const voucherRoute = require('./app/voucher/router')
const bankRoute = require('./app/bank/router')
const paymentRoute = require('./app/payment/router')
const transationsRoute = require('./app/transaction/router')
const playerRoute = require('./app/player/router')
const authRoute = require('./app/auth/router')

// version
app.use(`${v1}/cms/api`, authRoute)
app.use(`${v1}/cms/api`, playerRoute)

app.use(userRoute)
app.use(dashboardRoute)
app.use(categoriesRoute)
app.use(nominalRoute)
app.use(voucherRoute)
app.use(bankRoute)
app.use(paymentRoute)
app.use(transationsRoute)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
