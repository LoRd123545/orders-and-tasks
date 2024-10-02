import { Router } from 'express';

import orderRouter from './orders.js';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Hello, World!',
  })
})

router.use('/orders', orderRouter);

export default router;