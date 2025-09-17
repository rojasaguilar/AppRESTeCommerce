import express, { Router } from 'express';

import * as prodServController from '../controllers/prodserv.controller.js';

const router = express.Router();

router
  .route('/')
  .get(prodServController.getProdServList)
  .post(prodServController.postProdServItem);
router
  .route('/:id')
  .get(prodServController.getProdServItem)
  .put(prodServController.putProdServItem)
  .delete(prodServController.deleteProdServItem);
export default router;
