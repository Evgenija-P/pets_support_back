const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
require('dotenv').config();
const multer = require('multer');

console.clear();

const usersRouter = require('./src/routes/api/users');
const petsRouter = require('./src/routes/api/pets');
const newsRouter = require('./src/routes/api/news');
const sponsorsRouter = require('./src/routes/api/sponsors');
const noticesRouter = require('./src/routes/api/notices');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/news', newsRouter);
app.use('/api/sponsors', sponsorsRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/notices', noticesRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  // eslint-disable-next-line no-unused-vars
  if (err instanceof multer.MulterError) {
    err.status = 400;
  }
  const { status = 500, message = 'server error' } = err;
  res.status(status).json({ message });
});

module.exports = app;
