const express = require('express');
const app = express();

const { config } = require('./config/index');
const hotelsApi = require('./routes/hotels.js');

hotelsApi(app);

app.listen(config.port, function() {
  console.log(`listening http://localhost:${config.port}`);
});
