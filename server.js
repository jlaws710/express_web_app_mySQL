const express = require('express');
const debug = require('debug')('app:server');
const colors = require('colors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');
const sequelize = require('./src/db');

//check database connection
sequelize
  .authenticate()
  .then((res) => debug(colors.blue.inverse('Database is connected')))
  .catch((err) => {
    debug(
      colors.red.inverse('There was an error connecting to the database'),
      err
    );
    process.exit(1);
  });

const app = express();

if ((process.env.MODE = 'development')) {
  app.use(morgan('dev'));
}

dotenv.config({ path: path.join(__dirname, '.env') });
app.use(express.static(path.join(__dirname, 'src', 'public')));
app.use(express.json());

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  debug(colors.rainbow(`Server is up and running on PORT: ${PORT}`))
);
