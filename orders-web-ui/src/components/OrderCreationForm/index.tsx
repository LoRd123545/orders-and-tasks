import { useEffect, useState } from 'react';
import './OrderCreationForm.css';
import productService from 'src/api/products';
import orderService from 'src/api/orders';
import { Product, Order } from 'src/types';

export default function OrderCreationForm({
  setOrders,
}: {
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    productService
      .find()
      .then((products) => {
        setProducts(products);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <form
      className="create-form"
      onSubmit={(e) => {
        e.preventDefault();
        const email = e.currentTarget.email.value;
        const address = e.currentTarget.address.value;
        const productNameSelect = e.currentTarget.products;
        const productID =
          productNameSelect.options[productNameSelect.selectedIndex].value;

        orderService
          .create({
            billingAddress: address,
            email: email,
            productID: productID,
          })
          .then((product) => {
            setOrders((prev) => {
              const newOrders = [...prev];
              newOrders.push(product);
              return newOrders;
            });
          })
          .catch((err) => {
            console.error(err);
          });
      }}
    >
      <div className="create-form__email">
        <input type="email" placeholder="email" name="email" />
      </div>
      <div className="create-form__address">
        <input type="text" placeholder="address" name="address" />
      </div>
      <div className="create-form__product-name">
        <select
          id=""
          name="products"
          defaultValue={products.length > 0 ? products[0].name : ''}
        >
          {products.map((product) => {
            return (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className="create-form__status">
        <select name="" id="">
          <option value="not-started">not started</option>
          <option value="in-progress">in progress</option>
          <option value="done">done</option>
        </select>
      </div>
      <button className="create-form__submit-btn">Create order</button>
    </form>
  );
}
