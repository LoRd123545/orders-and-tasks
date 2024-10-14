import { Router } from 'express';

import reportRouter from './reports.js';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Hello, World!',
  })
})

router.use('/reports', reportRouter);

export default router;