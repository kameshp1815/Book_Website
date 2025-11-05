import express from 'express';
import { createOrder, getPublicKey } from '../controllers/paymentController.js';

const router = express.Router();

router.post('/create-order', createOrder);
router.get('/key', getPublicKey);

export default router;
