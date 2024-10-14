import { Router } from 'express';

import reportsController from '@app/controllers/reports.controller.js';

const router = Router();

// GET / <- get all reports
router.get('/', reportsController.find);

// GET /:id <- get one report
router.get('/:id', reportsController.findOne);

// POST / <- create report
router.post('/', reportsController.create);

// PATCH /:id <- update report
router.patch('/:id', reportsController.update);

// DELETE /:id <- remove report
router.delete('/:id', reportsController.remove);

export default router;