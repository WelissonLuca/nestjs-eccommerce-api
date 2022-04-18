import { CreateUserDto } from './dtos/create-user.dto';
import { Injectable } from '@nestjs/common';
import { Validator } from '../../validators/validator';

@Injectable()
export class UsersService {
  constructor(private readonly validator: Validator) {}
  async createUser(user: CreateUserDto) {
    return this.validator.validate(user, 'createUser');
  }
}
