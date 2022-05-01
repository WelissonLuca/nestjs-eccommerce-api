import { OrderStatus } from '../../common/types/order-status.enum';
import { PaymentMethod } from '../../common/types/payment-methods.enum';

export class CreateOrderDto {
  consumerId: string;
  products: {
    id: string;
    quantity: number;
  }[];
  status: OrderStatus;
  totalPrice?: number;
  paymentMethod: PaymentMethod;
  zipCode: string;
}
