import { Product, CreateProductDto, UpdateProductDto } from '@app/types/products/index.js';

import productsModel from '@app/models/products.model.js';

import { NotFoundError } from '@app/shared/errors/index.js';

const find = async (): Promise<Product[]> => {
  try {
    const products = await productsModel.find();
    return products;
  } catch (err) {
    throw err;
  }
}

const findOne = async (id: string): Promise<Product> => {
  try {
    const product = await productsModel.findOne(id);

    if (!product) {
      const message = 'Product not found!';
      const cause = `Product with id ${id} not found!`;

      throw new NotFoundError(message, '', cause, true);
    }

    return product;
  } catch (err) {
    throw err;
  }
}

const create = async (product: CreateProductDto): Promise<Product> => {
  try {
    const newProduct = await productsModel.create(product);
    return newProduct;
  } catch (err) {
    throw err;
  }
}

const update = async (id: string, newProduct: UpdateProductDto): Promise<null> => {
  try {
    const product = await productsModel.findOne(id);

    if (!product) {
      const message = 'Product not found!';
      const cause = `Product with id ${id} not found!`;

      throw new NotFoundError(message, '', cause, true);
    }

    productsModel.update(id, {
      name: newProduct.name || product.name,
      description: newProduct.description || product.description,
      category: newProduct.category || product.category,
      quantity: newProduct.quantity || product.quantity,
    });

    return null;
  } catch (err) {
    throw err;
  }
}

const remove = async (id: string): Promise<null> => {
  try {
    const product = await productsModel.findOne(id);

    if (!product) {
      const message = 'Product not found!';
      const cause = `Product with id ${id} not found!`;

      throw new NotFoundError(message, '', cause, true);
    }

    productsModel.remove(id);
    return null;
  } catch (err) {
    throw err;
  }
}

export default {
  find,
  findOne,
  create,
  update,
  remove,
}