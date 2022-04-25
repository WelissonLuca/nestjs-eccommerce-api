import { CreateUserDto } from './../modules/users/dtos/create-user.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateUserDto } from 'src/modules/users/dtos/update-user.dto';
import { isEmail } from '../utils/is-email';

@Injectable()
export class Validator {
  public validate(object: any, operation: any): void {
    switch (operation) {
      case 'createUser':
        this.createUserValidate(object);
        break;
      case 'updateUser':
        this.updateUserValidate(object);
    }
  }

  private createUserValidate(user: CreateUserDto): void {
    for (const key in user) {
      if (!user[key]) throw new BadRequestException(`${key} is required`);
    }
    if (!isEmail(user.email))
      throw new BadRequestException('Email is not valid');

    if (user.password.length < 6 || user.password.length > 20)
      throw new BadRequestException(
        'Password must be between 6 and 20 characters',
      );
  }

  private updateUserValidate(user: UpdateUserDto): void {
    for (const key in user) {
      if (!user[key]) throw new BadRequestException(`${key} is required`);
    }

    if (user.password.length < 6 || user.password.length > 20)
      throw new BadRequestException(
        'Password must be between 6 and 20 characters',
      );
  }
}
