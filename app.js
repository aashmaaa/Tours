const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//M  1. MIDDLEWARE
app.use(morgan('dev'));

app.use(express.json());

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
