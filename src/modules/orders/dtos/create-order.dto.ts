import { PaymentMethod } from '../../common/types/payment-methods.enum';

export class CreateOrderDto {
  consumerId: string;
  productsId: string[];
  quantity: number;
  status: string;
  paymentMethod: PaymentMethod;
  deliveryAddress?: DeliveryAddress;
}

export class DeliveryAddress {
  street: string;
  number: string;
  complement: string;
  district: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}
