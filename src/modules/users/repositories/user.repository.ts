import { Injectable } from '@nestjs/common';
import { UserRepositoryContracts } from '../contracts/user-repository.contract';

@Injectable()
export class UserRepository implements UserRepositoryContracts {
  findOneByEmail(email: string): Promise<any> {
    return;
  }
  create(user: any): Promise<any> {
    return;
  }
}
