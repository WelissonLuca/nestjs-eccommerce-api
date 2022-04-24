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
  });
});
