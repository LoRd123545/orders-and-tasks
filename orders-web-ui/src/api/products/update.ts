import { UpdateProductDto } from "src/types";

async function update(id: string, newProduct: UpdateProductDto): Promise<null> {
  return new Promise((acc, rej) => {
    fetch(`http://localhost/api/products/v1/products/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(newProduct),
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then(() => { acc(null); })
      .catch((err) => { rej(err) })
  });
}

export {
  update
}