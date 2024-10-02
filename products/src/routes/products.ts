import { Router } from 'express';

import productsController from '@app/controllers/products.controller.js';

const router = Router();

// GET / <- get all products
router.get('/', productsController.find);

// GET /:id <- get one product
router.get('/:id', productsController.findOne);

// POST / <- create product
router.post('/', productsController.create);

// PATCH /:id <- update product
router.patch('/:id', productsController.update);

// DELETE /:id <- remove product
router.delete('/:id', productsController.remove);

export default router;