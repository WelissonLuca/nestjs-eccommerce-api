import { ProductsServiceContracts } from './../common/contracts/services/products-service.contracts';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { mockedProducts } from '../common/mocks/products.mock';

describe('ProductsController', () => {
  let controller: ProductsController;

  const mockedProductsService = {
    findAll: jest.fn(() => Promise.resolve(mockedProducts)),
    findProductsByCategory: jest.fn((categoryId: string) =>
      Promise.resolve(
        mockedProducts.filter((product) => product.categoryId === categoryId),
      ),
    ),
    findProductById: jest.fn((productId: string) =>
      Promise.resolve(
        mockedProducts.find((product) => product.id === productId),
      ),
    ),
    findProductsByIds: jest.fn((ids: string[]) =>
      Promise.resolve(
        mockedProducts.filter((product) => ids.includes(product.id)),
      ),
    ),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: 'ProductsService',
          useValue: mockedProductsService,
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all products', async () => {
      const products = await controller.findAll();
      expect(products).toEqual(mockedProducts);
    });
  });

  describe('findProductsByCategory', () => {
    it('should return products by category', async () => {
      const categoryId = mockedProducts[0].categoryId;
      const products = await controller.findProductsByCategory(categoryId);
      expect(products).toEqual(
        mockedProducts.filter((product) => product.categoryId === categoryId),
      );
    });
  });

  describe('findProductById', () => {
    it('should return product by id', async () => {
      const productId = mockedProducts[0].id;
      const product = await controller.findProductById(productId);
      expect(product).toEqual(
        mockedProducts.find((product) => product.id === productId),
      );
    });
  });

  describe('findProductsByIds', () => {
    it('should return products by ids', async () => {
      const ids = mockedProducts.map((product) => product.id);
      const products = await controller.findProductsByIds(ids);
      expect(products).toEqual(mockedProducts);
    });
  });
});
