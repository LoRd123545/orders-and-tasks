import { Order } from "./Order.js"

export type CreateOrderDto = Pick<Order, 'email' | 'billingAddress' | 'productID'> & Partial<Order>;