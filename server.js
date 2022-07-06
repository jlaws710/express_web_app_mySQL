const express = require('express');
const debug = require('debug')('app:server');
const colors = require('colors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');

const app = express();

if ((process.env.MODE = 'development')) {
  app.use(morgan('dev'));
}

dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });
app.use(express.static(path.join(__dirname, 'src', 'public')));
app.use(express.json());

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  debug(colors.rainbow(`Server is up and running on PORT: ${PORT}`))
);
