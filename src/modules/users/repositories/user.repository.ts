import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserRepositoryContracts } from '../contracts/user-repository.contract';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRepository
  extends Repository<User>
  implements UserRepositoryContracts
{
  updateUser(data: UpdateUserDto, email: string): Promise<any> {
    return;
  }
  findOneByEmail(email: string): Promise<any> {
    return;
  }
  createUser(user: any): Promise<any> {
    return;
  }
}
