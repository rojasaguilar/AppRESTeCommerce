import config from './config/config.js';
import app from './app.js';

import connectDB from './config/database.config.js';
import mongoose from 'mongoose';

connectDB();

mongoose.connection.once('open', async () => {
  app.listen(app.get('port'), () => {
    console.log(
      `Server is running on: http://${config.HOST}:${app.get('port')}${
        config.API_URL
      }`
    );
  });
});
