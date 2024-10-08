import { ReactNode } from 'react';
import Order from '../Order';
import { Order as OrderType, Product as ProductType } from 'src/types';
import './OrderList.css';

export default function OrderList({
  orders,
  products,
  handleDelete,
}: {
  orders: OrderType[];
  products: Map<string, ProductType>;
  handleDelete: (id: string) => void;
}) {
  const list: ReactNode[] = [];

  for (const order of orders) {
    const product = products.get(order.productID);
    if (product) {
      list.push(
        <Order
          email={order.email}
          productName={product.name}
          address={order.billingAddress}
          status={order.status}
          id={order.id}
          handleDelete={handleDelete}
          key={order.id}
        />
      );
    }
  }

  return <div className="orders">{list}</div>;
}
