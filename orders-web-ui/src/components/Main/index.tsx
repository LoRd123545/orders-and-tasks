import './Main.css';
import OrderList from '../OrderList';
import { useEffect, useState } from 'react';
import orderService from 'src/api/orders';
import productService from 'src/api/products';
import { Order, Product } from 'src/types';
import OrderCreationForm from '../OrderCreationForm';

export default function Main() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Map<string, Product>>(new Map());

  useEffect(() => {
    orderService
      .find()
      .then((result) => {
        setOrders(result);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    productService
      .find()
      .then((products) => {
        const map: Map<string, Product> = new Map();

        for (const product of products) {
          map.set(product.id, product);
        }

        setProducts(map);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  function handleDelete(id: string) {
    orderService
      .remove(id)
      .then(() => {})
      .catch((err) => {
        console.error(err);
      });

    setOrders((prev) => {
      return prev.filter((order) => order.id !== id);
    });
  }

  return (
    <main className="main">
      <OrderCreationForm setOrders={setOrders} />
      <OrderList
        orders={orders}
        products={products}
        handleDelete={handleDelete}
      />
    </main>
  );
}
