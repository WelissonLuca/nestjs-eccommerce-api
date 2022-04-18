import { CreateUserDto } from './dtos/create-user.dto';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Validator } from '../../validators/validator';
import { UserRepositoryContracts } from './contracts/user-repository.contract';

@Injectable()
export class UsersService {
  constructor(
    private readonly validator: Validator,
    @Inject('UserRepository')
    private userRepository: UserRepositoryContracts,
  ) {}
  async createUser(user: CreateUserDto) {
    this.validator.validate(user, 'createUser');
    const userExists = await this.userRepository.findOneByEmail(user.email);
    if (userExists) {
      throw new BadRequestException(
        `User with email ${user.email} already exists`,
      );
    }
    return this.userRepository.create(user);
  }

  async findOneByEmail(email: string) {
    const user = await this.userRepository.findOneByEmail(email);

    if (!user) {
      throw new BadRequestException(`User with email ${email} does not exist`);
    }

    return user;
  }
}
