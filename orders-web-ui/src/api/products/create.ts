import { Product, CreateProductDto } from "src/types";

async function create(product: CreateProductDto): Promise<Product> {
  return new Promise((acc, rej) => {
    fetch('http://localhost/api/products/v1/products', {
      method: 'POST',
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((response) => response.json())
      .then((data) => { acc(data) })
      .catch((err) => { rej(err) })
  });
}

export { create }