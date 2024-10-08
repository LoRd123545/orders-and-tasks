import { Product } from "src/types";

async function findOne(id: string): Promise<Product> {
  return new Promise((acc, rej) => {
    fetch(`http://localhost/api/products/v1/products/${id}`)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        acc(data);
      })
      .catch((err) => {
        rej(err);
      })
  })
}

export { findOne }