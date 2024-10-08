import { Product } from "./Product"

export type CreateProductDto = Pick<Product, 'name' | 'category'> & Partial<Product>;