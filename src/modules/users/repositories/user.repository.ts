import { Injectable } from '@nestjs/common';
import { UserRepositoryContracts } from '../contracts/user-repository.contract';
import { UpdateUserDto } from '../dtos/update-user.dto';

@Injectable()
export class UserRepository implements UserRepositoryContracts {
  update(data: UpdateUserDto, email: string): Promise<any> {
    return;
  }
  findOneByEmail(email: string): Promise<any> {
    return;
  }
  create(user: any): Promise<any> {
    return;
  }
}
