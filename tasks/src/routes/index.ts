import { Router } from 'express';

import taskRouter from './tasks.js';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Hello, World!',
  })
})

router.use('/tasks', taskRouter);

export default router;