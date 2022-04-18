import { isEmail } from 'class-validator';
import { CreateUserDto } from './../modules/users/dtos/create-user.dto';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class Validator {
  public validate(object: any, operation: any): void {
    switch (operation) {
      case 'createUser':
        this.createUserValidate(object);
        break;
    }
  }

  private createUserValidate(user: CreateUserDto): void {
    for (const key in user) {
      console.log(user[key]);
      if (!user[key]) throw new BadRequestException(`${key} is required`);
    }
    if (!isEmail(user.email))
      throw new BadRequestException('Email is not valid');

    if (user.password.length < 6 || user.password.length > 20)
      throw new BadRequestException(
        'Password must be between 6 and 20 characters',
      );
  }
}
