const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const AppError = require('./utils/appError');
const globalErrorHandeler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//M  1. GLOBAL MIDDLEWARE
//Set security http headers
app.use(helmet());

//Development Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requeste from this IP, please try again in an hour!',
});
app.use('/api', limiter);

app.use(morgan('dev'));

//Body parser, reading data from boody into rerq.body
app.use(express.json({ limit: '10kb' }));
/////////////////
// TO USE STATIC FILE FOLDERS IN OUR APPLICATION
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

// 3. ROUTES

// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', createTour);
// app.get('/api/v1/tours/:id', getTour);
// app.path('api/v1/tours/:id', updateTour);
// app.delete('api/v1/tours/:id', deleteTour);

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  // const err = new Error(`Can't find ${req.originalUrl} on the server`);
  // err.status = 'fai;';
  // err.statusCode = 404;
  next(new AppError(`Can't find ${req.originalUrl} on the server`));
});

app.use(globalErrorHandeler);

module.exports = app;
