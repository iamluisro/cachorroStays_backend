const express = require('express');
const app = express();
const helmet = require('helmet');

const { config } = require('./config/index');

const authApi = require('./routes/auth');
const hotelsApi = require('./routes/hotels.js');
const userHotelsApi = require('./routes/userHotels');

const {
  logErrors,
  errorHandler,
  wrapError
} = require('./utils/middleware/errorHandlers.js');

const notFoundHandler = require('./utils/middleware/notFoundHandler.js');

//body_parser middleware
app.use(express.json());
app.use(helmet());

//Routes
authApi(app);
hotelsApi(app);
userHotelsApi(app);

//Catch 404 error
app.use(notFoundHandler);

//Error Middleware
app.use(logErrors);
app.use(wrapError);
app.use(errorHandler);

app.listen(config.port, function() {
  console.log(`listening http://localhost:${config.port}`);
});
