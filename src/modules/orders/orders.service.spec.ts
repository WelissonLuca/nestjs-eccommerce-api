import { OrderRepository } from './repositories/order.repository';
import { faker } from '@faker-js/faker';
import { OrderMemoryRepository } from './repositories/memory/order-memory.repository';
import { OrderRepositoryContracts } from './contracts/order-repository.contracts';
import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { mockedProducts } from '../common/mocks/products.mock';
import { PaymentMethod } from '../common/types/payment-methods.enum';
import { OrderStatus } from '../common/types/order-status.enum';

describe('OrdersService', () => {
  let orderRepository: OrderRepositoryContracts;
  let service: OrdersService;

  const productService = {
    findProductsByIds: jest.fn((ids: string[]) => {
      const result = mockedProducts.filter((p) => ids.includes(p.id));

      return Promise.resolve(result);
    }),
  };

  beforeEach(async () => {
    orderRepository = new OrderMemoryRepository();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: OrderRepository,
          useValue: orderRepository,
        },
        {
          provide: 'FreightProvider',
          useValue: {
            calculateFreight: jest.fn(() => Promise.resolve({})),
          },
        },
        {
          provide: 'ProductsService',
          useValue: productService,
        },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('registerOrder', () => {
    it('should return a order', async () => {
      const order = await service.registerOrder({
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
    });
  });
});
