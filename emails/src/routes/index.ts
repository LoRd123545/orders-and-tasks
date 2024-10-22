import { Router } from 'express';

import emailRouter from './emails.js';

const router = Router();

router.use('/emails', emailRouter);

export default router;
