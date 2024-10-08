import { Order } from 'src/types';

async function find(): Promise<Order[]> {
  return new Promise((acc, rej) => {
    fetch('http://localhost/api/orders/v1/orders')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        acc(data);
      })
      .catch((err) => {
        rej(err);
      })
  })
}

export {
  find
}