import {Router} from 'express';

import config from '../../../config/config.js';

import prodServRoutes from './prodServ.routes.js';

const routerAPI = (app) => {
const router = Router();
const api = config.API_URL;

app.use(api,router);

router.use('/prod-serv',prodServRoutes)

return router;
}
export default routerAPI;