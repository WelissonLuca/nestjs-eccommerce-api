import { PaymentMethod } from '../../common/types/payment-methods.enum';

export class CreateOrderDto {
  consumerId: string;
  products: {
    id: string;
    quantity: number;
  }[];
  status: string;
  totalPrice?: number;
  paymentMethod: PaymentMethod;
  zipCode: string;
}
