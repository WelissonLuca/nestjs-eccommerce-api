import { CreateUserDto } from './dtos/create-user.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { internet } from 'faker';
import { Validator } from '../../validators/validator';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, Validator],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('should not create user if name is null', () => {
      const user = {
        name: '',
        email: internet.email(),
        password: internet.password(),
      } as CreateUserDto;

      const promise = service.createUser(user);
      expect(promise).rejects.toThrowError('name is required');
    });

    it('should not create user if email is null', () => {
      const user = {
        name: internet.userName(),
        email: '',
        password: internet.password(),
      } as CreateUserDto;

      const promise = service.createUser(user);
      expect(promise).rejects.toThrowError('email is required');
    });
    it('should not create user if password is null', () => {
      const user = {
        name: internet.userName(),
        email: internet.email(),
        password: '',
      } as CreateUserDto;

      const promise = service.createUser(user);
      expect(promise).rejects.toThrowError('password is required');
    });
    it('should not create a user if email is not valid', () => {
      const user = {
        email: 'invalid-email',
        password: internet.password(),
        name: internet.userName(),
      };

      const promise = service.createUser(user);
      expect(promise).rejects.toThrowError('Email is not valid');
    });

    it('should not create a user if password less than 6 characters', () => {
      const user = {
        email: internet.email(),
        password: '123',
        name: internet.userName(),
      };

      const promise = service.createUser(user);
      expect(promise).rejects.toThrowError(
        'Password must be between 6 and 20 characters',
      );
    });

    it('should not create a user if password longer than 20 characters', () => {
      const user = {
        email: internet.email(),
        password: internet.password(21),
        name: internet.userName(),
      };

      const promise = service.createUser(user);
      expect(promise).rejects.toThrowError(
        'Password must be between 6 and 20 characters',
      );
    });
  });
});
