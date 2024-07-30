const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//M  1. MIDDLEWARE
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(morgan('dev'));

app.use(express.json());

/////////////////
// TO USE STATIC FILE FOLDERS IN OUR APPLICATION
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log('Jello from the middleware 🫶');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
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

// 4. START SERVER

module.exports = app;
// "devDependencies": {
//   "eslint": "^8.57.0",
//   "eslint-config-airbnb": "^19.0.4",
//   "eslint-config-prettier": "^9.1.0",
//   "eslint-plugin-import": "^2.29.1",
//   "eslint-plugin-jsx-a11y": "^6.9.0",
//   "eslint-plugin-node": "^11.1.0",
//   "eslint-plugin-prettier": "^5.2.1",
//   "eslint-plugin-react": "^7.35.0",
//   "prettier": "^3.3.3"
