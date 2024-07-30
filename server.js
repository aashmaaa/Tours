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

// console.log(app.get('env'));
// console.log(process.env);

const port = 27017 || process.env.PORT;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
