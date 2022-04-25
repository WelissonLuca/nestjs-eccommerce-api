import { PaymentMethod } from 'src/modules/common/types/payment-methods.enum';
import { DefaultBaseEntity } from '../../common/base/entities/default-base-entity';

export class Order extends DefaultBaseEntity {
  consumerId: string;
  productId: string;
  quantity: number;
  totalItemsPrice: number;
  totalPrice: number;
  status: string;
  freight: number;
  discount?: number;
  paymentMethod: PaymentMethod;
}
