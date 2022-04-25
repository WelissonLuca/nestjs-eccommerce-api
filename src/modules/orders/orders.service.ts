import { Order } from './entities/order.entity';
import { ProductsService } from './../products/products.service';
import { FreightDto } from './../../providers/freight/dtos/freight.dto';
import { Product } from './../products/entities/product.entity';
import { Inject, Injectable } from '@nestjs/common';
import { FreightProvider } from '../../providers/freight/freight.provider';
import { CreateOrderDto } from './dtos/create-order.dto';
import { OrderRepositoryContracts } from './contracts/order-repository.contracts';
import { OrderOutputDto } from './dtos/order-output.dto';
import { OrderServiceContracts } from '../common/contracts/services/order-service.contracts';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderRepository } from './repositories/order.repository';

@Injectable()
export class OrdersService implements OrderServiceContracts {
  constructor(
    @InjectRepository(OrderRepository)
    private readonly orderRepository: OrderRepositoryContracts,
    @Inject('FreightProvider')
    private readonly freightProvider: FreightProvider,
    @Inject('ProductsService')
    private readonly productsService: ProductsService,
  ) {}
  async registerOrder(data: CreateOrderDto): Promise<OrderOutputDto> {
    const productsIds = data.products.map((p) => p.id);
    const products = await this.productsService.findProductsByIds(productsIds);

    if (products.length === 0) {
      throw new Error('No products found');
    }

    const freightInfos = await this.calculateFreightOptions(
      data.zipCode,
      products,
    );

    const order = await this.persistOrder(data, products);

    const orderOutput = new OrderOutputDto();

    Object.assign(orderOutput, { ...order, ...freightInfos });

    return orderOutput;
  }

  private async calculateFreightOptions(
    zipCode: string,
    products: Product[],
  ): Promise<FreightDto> {
    const freightInfos = await this.freightProvider.calculateFreight({
      destination: zipCode,
      products,
    });

    if (!freightInfos) {
      throw new Error('Freight not found');
    }

    return freightInfos;
  }

  private calculateTotalPrice(
    products: Product[],
    order: CreateOrderDto,
  ): number {
    return products.reduce(
      (acc, product) =>
        acc +
        product.price *
          order.products.find((p) => p.id === product.id).quantity,
      0,
    );
  }

  private async persistOrder(
    order: CreateOrderDto,
    products: Product[],
  ): Promise<Order> {
    const totalPrice = this.calculateTotalPrice(products, order);
    return this.orderRepository.registerOrder({
      ...order,
      totalPrice,
    });
  }
}
