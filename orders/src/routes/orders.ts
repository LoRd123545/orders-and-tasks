import { Router } from 'express';

import ordersController from '@app/controllers/orders.controller.js';

const router = Router();

// GET / <- get all orders
router.get('/', ordersController.find);

// GET /:id <- get one order
router.get('/:id', ordersController.findOne);

// POST /filters <- filter orders
router.post('/filters', ordersController.filter);

// POST / <- create order
router.post('/', ordersController.create);

// PATCH /:id <- update order
router.patch('/:id', ordersController.update);

// DELETE /:id <- remove order
router.delete('/:id', ordersController.remove);

export default router;
