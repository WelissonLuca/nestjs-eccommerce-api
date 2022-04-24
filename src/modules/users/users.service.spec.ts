import { UserMemoryRepository } from './repositories/memory/user-memory.repository';
import { CreateUserDto } from './dtos/create-user.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { internet } from 'faker';
import { Validator } from '../../validators/validator';
import { UserRepositoryContracts } from './contracts/user-repository.contract';
import { UpdateUserDto } from './dtos/update-user.dto';

describe('UsersService', () => {
  let service: UsersService;
  let createUserDto: CreateUserDto;
  let updateUserDto: UpdateUserDto;
  let userRepository: UserRepositoryContracts;

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

    userRepository = new UserMemoryRepository();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        Validator,
        {
          provide: 'UserRepository',
          useValue: userRepository,
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
      userRepository.create(createUserDto);
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
      userRepository.create(createUserDto);
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
    it('should not update user if name is null', () => {
      userRepository.create(createUserDto);
      const promise = service.updateUser(
        {
          ...updateUserDto,
          name: '',
        },
        createUserDto.email,
      );
      expect(promise).rejects.toThrowError('name is required');
    });
    it('should not update user if password is null', () => {
      userRepository.create(createUserDto);
      const promise = service.updateUser(
        {
          ...createUserDto,
          password: '',
        },
        createUserDto.email,
      );
      expect(promise).rejects.toThrowError('password is required');
    });
    it('should not update a user if password less than 6 characters', () => {
      userRepository.create(createUserDto);
      const promise = service.updateUser(
        {
          ...updateUserDto,
          password: '12345',
        },
        createUserDto.email,
      );
      expect(promise).rejects.toThrowError(
        'Password must be between 6 and 20 characters',
      );
    });

    it('should not create a user if password longer than 20 characters', () => {
      userRepository.create(createUserDto);
      const promise = service.updateUser(
        {
          ...updateUserDto,
          password: internet.password(21),
        },
        createUserDto.email,
      );
      expect(promise).rejects.toThrowError(
        'Password must be between 6 and 20 characters',
      );
    });

    it('should update user', async () => {
      jest.spyOn(userRepository, 'update');
      userRepository.create(createUserDto);

      await service.updateUser(updateUserDto, createUserDto.email);

      expect(userRepository.update).toHaveBeenCalledWith(
        updateUserDto,
        createUserDto.email,
      );
    });
  });
});
