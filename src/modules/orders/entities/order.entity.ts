import { PaymentMethod } from 'src/modules/common/types/payment-methods.enum';
import { Entity } from 'typeorm';
import { DefaultBaseEntity } from '../../common/base/entities/default-base-entity';

@Entity('orders')
export class Order extends DefaultBaseEntity {
  consumerId: string;
  products: {
    id: string;
    quantity: number;
  };
  totalPrice: number;
  status: string;
  discount?: number;
  paymentMethod: PaymentMethod;
}
