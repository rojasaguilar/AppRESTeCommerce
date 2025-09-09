import express from 'express';

import morgan from 'morgan';
import cors from 'cors';

import config from './config/config.js';

//IMPORT ROUTES
import routerAPI from './api/v1/routes/index.js';

const app = express();

app.set('port', config.PORT);

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));

const api = config.API_URL;

app.get(`${api}`, (req, res) => {
  res.send(
    `<h1>RESTful running in root</h1> 
     <p> eCommerce: <b>${api}/api-docs</b> for more information.</p>`
  );
});

app.get(`/DrFIC`, (req, res) => {
  res.send(
    `<h1>RESTful running in DrFIC</h1> 
    <p> eCommerce: <b>${api}/api-docs</b> for more information.</p>`
  );
});

routerAPI(app);

export default app;
