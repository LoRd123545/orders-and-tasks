import { Router } from 'express';

import productRouter from './products.js';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Hello, World!',
  })
})

router.use('/products', productRouter);

export default router;