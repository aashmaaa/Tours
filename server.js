const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');

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

process('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💣 Shutting Down...');
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💣 Shutting Down...');
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
