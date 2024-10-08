import { UpdateOrderDto } from "src/types";

async function update(id: string, newOrder: UpdateOrderDto): Promise<null> {
  return new Promise((acc, rej) => {
    fetch(`http://localhost/api/orders/v1/orders/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(newOrder),
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