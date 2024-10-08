import { Order, CreateOrderDto } from "src/types";

async function create(order: CreateOrderDto): Promise<Order> {
  return new Promise((acc, rej) => {
    fetch('http://localhost/api/orders/v1/orders', {
      method: 'POST',
      body: JSON.stringify(order),
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