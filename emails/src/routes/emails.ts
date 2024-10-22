import { Router } from 'express';

import emailsController from '@app/controllers/emails.controller.js';

const router = Router();

router.post('/', emailsController.create);

export default router;
