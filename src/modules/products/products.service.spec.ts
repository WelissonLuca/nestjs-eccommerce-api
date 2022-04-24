import { ProductMemoryRepository } from './repositories/memory/product-memory.repository';
import { ProductRepositoryContracts } from './contracts/product-repository.contract';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { internet, random } from 'faker';
import { CreateProductDto } from './dtos/create-product.dto';

describe('ProductsService', () => {
  let productRepository: ProductRepositoryContracts;
  let service: ProductsService;
  let createProductDto: CreateProductDto;

  beforeEach(async () => {
    productRepository = new ProductMemoryRepository();
    createProductDto = {
      name: internet.userName(),
      categoryId: random.uuid(),
      description: random.words(),
      price: random.number(),
      quantity: random.number(),
      thumb: random.image(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        { provide: 'ProductRepository', useValue: productRepository },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('FindAll', () => {
    it('should return an array of products', async () => {
      await productRepository.create(createProductDto);
      const products = await service.findAll();
      expect(products).toBeDefined();
      expect(products).toBeInstanceOf(Array);
    });

    it('should throw if no products are found', async () => {
      const promise = service.findAll();

      await expect(promise).rejects.toThrow('No products found');
    });
  });

  describe('FindByCategory', () => {
    it('should return an array of products', async () => {
      await productRepository.create(createProductDto);
      const products = await service.findProductsByCategory(
        createProductDto.categoryId,
      );
      expect(products).toBeDefined();
      expect(products).toBeInstanceOf(Array);
    });

    it('should throw if no products are found', async () => {
      const promise = service.findProductsByCategory(
        createProductDto.categoryId,
      );

      await expect(promise).rejects.toThrow('No products found');
    });
  });

  describe('FindById', () => {
    it('should return a product', async () => {
      const product = await productRepository.create(createProductDto);
      const foundProduct = await service.findProductById(product.id);
      expect(foundProduct).toBeDefined();
      expect(foundProduct).toBeInstanceOf(Object);
      expect(foundProduct.id).toBe(product.id);
    });

    it('should throw if no product is found', async () => {
      const promise = service.findProductById(random.uuid());

      await expect(promise).rejects.toThrow('No product found');
    });
  });
});
