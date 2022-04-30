import { UserRepository } from './repositories/user.repository';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from './dtos/update-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Validator } from '../../validators/validator';
import { UserRepositoryContracts } from './contracts/user-repository.contract';
import { UserModel } from '../common/models/user.model';

@Injectable()
export class UsersService {
  constructor(
    private readonly validator: Validator,
    @InjectRepository(UserRepository)
    private userRepository: UserRepositoryContracts,
  ) {}
  async createUser(user: CreateUserDto): Promise<UserModel> {
    this.validator.validate(user, 'createUser');
    const userExists = await this.userRepository.findByEmail(user.email);
    if (userExists) {
      throw new BadRequestException(
        `User with email ${user.email} already exists`,
      );
    }
    return this.userRepository.createUser(user);
  }

  async findByEmail(email: string): Promise<UserModel> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new BadRequestException(`User with email ${email} does not exist`);
    }

    return user;
  }

  async updateUser(data: UpdateUserDto, email: string): Promise<void> {
    this.validator.validate(data, 'updateUser');
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new BadRequestException(`User with email ${email} does not exist`);
    }

    return this.userRepository.updateUser(data, email);
  }
}
