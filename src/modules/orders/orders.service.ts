import { FreightDto } from './../../providers/freight/dtos/freight.dto';
import { Product } from './../products/entities/product.entity';
import { Injectable } from '@nestjs/common';
import { FreightProvider } from '../../providers/freight/freight.provider';
import { CreateOrderDto, DeliveryAddress } from './dtos/create-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(private readonly freightProvider: FreightProvider) {}
  async registerOrder(order: CreateOrderDto): Promise<Order> {
    
  }

  private async calculateTotalPrice(
    adress: DeliveryAddress,
    products: Product[],
  ): Promise<FreightDto> {
    const freightInfos = await this.freightProvider.calculateFreight({
      destination: adress.zipCode,
      products,
    });

    if (!freightInfos) {
      throw new Error('Freight not found');
    }

    return freightInfos;
  }
}
