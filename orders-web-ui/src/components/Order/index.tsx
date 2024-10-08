import './Order.css';

export default function Order(props: {
  email: string;
  id: string;
  address: string;
  productName: string;
  status: string;
  handleDelete: (id: string) => void;
}) {
  return (
    <div className="order">
      <div className="order__data">
        <div className="order__email">{props.email}</div>
        <div className="order__address">{props.address}</div>
        <div className="order__product-name">{props.productName}</div>
        <div className="order__status">{props.status}</div>
      </div>
      <button
        className="order__btn"
        onClick={(e) => {
          e.preventDefault();
          props.handleDelete(props.id);
        }}
      >
        <img src="/icons/delete.svg" alt="" />
      </button>
    </div>
  );
}
