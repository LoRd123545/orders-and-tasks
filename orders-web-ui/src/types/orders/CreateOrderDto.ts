import { Order } from "./Order"

export type CreateOrderDto = Pick<Order, 'email' | 'billingAddress' | 'productID'> & Partial<Order>;