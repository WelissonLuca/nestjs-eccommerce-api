import { CreateUserDto } from './dtos/create-user.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { internet } from 'faker';
import { Validator } from '../../validators/validator';
import { UserRepositoryContracts } from './contracts/user-repository.contract';
import { UpdateUserDto } from './dtos/update-user.dto';

describe('UsersService', () => {
  const users = [];
  let service: UsersService;
  let createUserDto: CreateUserDto;
  let updateUserDto: UpdateUserDto;

  const mockedUserRepository: UserRepositoryContracts = {
    create: jest.fn((user) => {
      users.push(user);
      return user;
    }),
    findOneByEmail: jest.fn((email) => {
      return users.find((user) => user.email === email);
    }),
    update: jest.fn((data, email) => {
      const user = users.find((user) => user.email === email);
      user.name = data.name;
      user.password = data.password;
      return user;
    }),
  };

  beforeEach(async () => {
    createUserDto = {
      name: internet.userName(),
      email: internet.email(),
      password: internet.password(),
    };

    updateUserDto = {
      name: internet.userName(),
      password: internet.password(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        Validator,
        {
          provide: 'UserRepository',
          useValue: mockedUserRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('should not create user if name is null', () => {
      const promise = service.createUser({
        ...createUserDto,
        name: '',
      });
      expect(promise).rejects.toThrowError('name is required');
    });

    it('should not create user if email is null', () => {
      const promise = service.createUser({
        ...createUserDto,
        email: '',
      });
      expect(promise).rejects.toThrowError('email is required');
    });
    it('should not create user if password is null', () => {
      const promise = service.createUser({
        ...createUserDto,
        password: '',
      });
      expect(promise).rejects.toThrowError('password is required');
    });
    it('should not create a user if email is not valid', () => {
      const promise = service.createUser({
        ...createUserDto,
        email: 'invalidEmail',
      });
      expect(promise).rejects.toThrowError('Email is not valid');
    });

    it('should not create a user if password less than 6 characters', () => {
      const promise = service.createUser({
        ...createUserDto,
        password: '12345',
      });
      expect(promise).rejects.toThrowError(
        'Password must be between 6 and 20 characters',
      );
    });

    it('should not create a user if password longer than 20 characters', () => {
      const promise = service.createUser({
        ...createUserDto,
        password: internet.password(21),
      });
      expect(promise).rejects.toThrowError(
        'Password must be between 6 and 20 characters',
      );
    });
    it('should not create a user if user already exists', () => {
      jest
        .spyOn(mockedUserRepository, 'findOneByEmail')
        .mockReturnValueOnce(Promise.resolve(createUserDto));
      const promise = service.createUser(createUserDto);
      expect(promise).rejects.toThrowError(
        `User with email ${createUserDto.email} already exists`,
      );
    });

    it('should create a user', async () => {
      const user = await service.createUser(createUserDto);

      expect(user).toEqual(createUserDto);
    });
  });

  describe('findOneByEmail', () => {
    it('should return exception to a user not-exists', () => {
      const email = internet.email();
      const promise = service.findOneByEmail(email);
      expect(promise).rejects.toThrowError(
        `User with email ${email} does not exist`,
      );
    });

    it('should return user', () => {
      mockedUserRepository.create(createUserDto);
      const promise = service.findOneByEmail(createUserDto.email);
      expect(promise).resolves.toEqual(createUserDto);
    });
  });

  describe('updateUser', () => {
    it('should return exception to a user not-exists', () => {
      const email = internet.email();
      const promise = service.updateUser(updateUserDto, email);
      expect(promise).rejects.toThrowError(
        `User with email ${email} does not exist`,
      );
    });

    it('should update user', async () => {
      mockedUserRepository.create(createUserDto);

      const user = await service.updateUser(updateUserDto, createUserDto.email);

      expect(user).toEqual({ ...createUserDto, ...updateUserDto });
    });
  });
});
