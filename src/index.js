import config from './config/config.js';
import app from './app.js';

app.listen(app.get('port'), () => {
  console.log(
    `Server is running on: http://${config.HOST}:${app.get('port')}${
      config.API_URL
    }`
  );
});

console.log(`PUERTO ${process.env.PORT}`);
