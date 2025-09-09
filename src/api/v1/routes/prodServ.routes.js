import express, { Router } from 'express';

import * as prodServController from '../controllers/prodserv.controller.js';

const router = express.Router();

router.get('/', prodServController.getProdServList);
router.get('/:id', prodServController.getProdServItem);
// router.post('/', prodServController)

export default router;
