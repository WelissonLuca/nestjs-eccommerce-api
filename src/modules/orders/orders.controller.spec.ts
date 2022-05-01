import { CreateOrderDto } from './dtos/create-order.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { setBaseEntityValues } from '../../utils/set-base-entity-values';
import { Order } from './entities/order.entity';
import faker from '@faker-js/faker';
import { OrderStatus } from '../common/types/order-status.enum';
import { PaymentMethod } from '../common/types/payment-methods.enum';
import { mockedProducts } from '../common/mocks/products.mock';

describe('OrdersController', () => {
  let controller: OrdersController;

  const mockedOrderService = {
    registerOrder: jest.fn((data: CreateOrderDto) => {
      const entity = setBaseEntityValues();
      const order = new Order();
      return Object.assign(order, { ...entity, ...data });
    }),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        {
          provide: 'OrdersService',
          useValue: mockedOrderService,
        },
      ],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('registerOrder', () => {
    it('should return a order', async () => {
      const order = await controller.registerOrder({
        zipCode: faker.address.zipCode(),
        consumerId: faker.datatype.uuid(),
        paymentMethod: PaymentMethod.CREDIT_CARD,
        status: OrderStatus.PENDING,
        products: [
          {
            id: mockedProducts[0].id,
            quantity: 3,
          },
        ],
      });

      expect(order).toBeDefined();
      expect(order.id).toBeDefined();
      expect(order.consumerId).toBeDefined();
      expect(order.paymentMethod).toBeDefined();
      expect(order.status).toBeDefined();
      expect(order.products).toBeDefined();
    });
  });
});
