const express = require('express');
const app = express();

const { config } = require('./config/index');
const hotelsApi = require('./routes/hotels.js');

const {
  logErrors,
  errorHandler,
  wrapError
} = require('./utils/middleware/errorHandlers.js');

const notFoundHandler = require('./utils/middleware/notFoundHandler.js');

//body_parser middleware
app.use(express.json());

//Routes
hotelsApi(app);

//Catch 404 error
app.use(notFoundHandler);

//Error Middleware
app.use(logErrors);
app.use(wrapError);
app.use(errorHandler);

app.listen(config.port, function() {
  console.log(`listening http://localhost:${config.port}`);
});
