import { faker } from '@faker-js/faker';
import { randomBytes } from 'crypto';
import { CreateUserDto } from './dtos/create-user.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { setBaseEntityValues } from '../../utils/set-base-entity-values';

describe('UsersController', () => {
  let controller: UsersController;

  const mockedUserService = {
    createUser: jest.fn((data: CreateUserDto) => {
      const entity = setBaseEntityValues();
      const user = new User();
      return Promise.resolve(Object.assign(user, { ...entity, ...data }));
    }),
    findByEmail: jest.fn((email: string) => {
      const entity = setBaseEntityValues();
      const user = new User();
      return Promise.resolve(
        Object.assign(user, {
          ...entity,
          email,
          id: randomBytes(10).toString('hex'),
        }),
      );
    }),

    updateUser: jest.fn((id: string, data: CreateUserDto) => {
      return Promise.resolve();
    }),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: 'UsersService',
          useValue: mockedUserService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      const data = {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      };

      const user = await controller.createUser(data);

      expect(user).toBeDefined();
      expect(user.name).toBe(data.name);
      expect(user.email).toBe(data.email);
      expect(user.password).toBeUndefined();
      expect(user.id).toBeDefined();
    });
  });

  describe('findByEmail', () => {
    it('should find a user by email', async () => {
      const email = faker.internet.email();

      const user = await controller.findByEmail(email);

      expect(user).toBeDefined();
      expect(user.email).toBe(email);
      expect(user.id).toBeDefined();
    });
  });

  describe('updateUser', () => {
    it('should update a user', async () => {
      const email = faker.internet.email();
      const data = {
        name: faker.name.findName(),
        password: faker.internet.password(),
      };

      await controller.updateUser(email, data);

      expect(mockedUserService.updateUser).toHaveBeenCalledWith(data, email);
    });
  });
});
