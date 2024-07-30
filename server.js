const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASEPASSWORD
);

mongoose
  .connect(DB, {
    // useUnifiedTopology: true,
  })
  .then((con) => {
    // console.log(con.connections);
    console.log('DB connection Successful');
  });

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  rating: { type: Number, default: 4.5 },
  price: { type: Number, required: [true, 'A tour must have a price'] },
});
const Tour = mongoose.model('Tour', tourSchema);

const testTour = new Tour({
  name: 'tq fdcfg iuojfk',
  rating: 2.4,
  price: 2000,
});

testTour
  .save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.log('Error :( ', err);
  });

// console.log(app.get('env'));
// console.log(process.env);

const port = 27017 || process.env.PORT;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
