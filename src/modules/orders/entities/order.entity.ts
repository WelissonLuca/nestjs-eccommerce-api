import { OrderStatus } from '../../common/types/order-status.enum';
import { PaymentMethod } from 'src/modules/common/types/payment-methods.enum';
import { Column, Entity } from 'typeorm';
import { DefaultBaseEntity } from '../../common/base/entities/default-base-entity';

@Entity('orders')
export class Order extends DefaultBaseEntity {
  @Column({
    type: 'uuid',
  })
  consumerId: string;
  @Column({
    type: 'jsonb',
  })
  products: {
    id: string;
    quantity: number;
  }[];

  @Column({
    type: 'numeric',
    name: 'total_price',
  })
  totalPrice: number;
  @Column({
    type: 'enum',
    enum: OrderStatus,
  })
  status: OrderStatus;

  @Column({
    type: 'enum',
    enum: PaymentMethod,
  })
  paymentMethod: PaymentMethod;
}
