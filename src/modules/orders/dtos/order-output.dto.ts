import { FreightDto } from './../../../providers/freight/dtos/freight.dto';
import { Order } from './../entities/order.entity';
export class OrderOutputDto extends Order {
  freightInfos: FreightDto;
}
