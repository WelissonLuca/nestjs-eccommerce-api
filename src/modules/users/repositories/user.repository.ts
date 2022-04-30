import { CreateUserDto } from './../dtos/create-user.dto';
import { Repository } from 'typeorm';
import { UserRepositoryContracts } from '../contracts/user-repository.contract';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { User } from '../entities/user.entity';

export class UserRepository
  extends Repository<User>
  implements UserRepositoryContracts
{
  async updateUser(data: UpdateUserDto, email: string): Promise<void> {
    await this.update(
      {
        ...data,
        updatedAt: new Date(),
      },
      {
        email,
      },
    );
  }
  async findOneByEmail(email: string): Promise<User> {
    return this.findOneBy({ email });
  }
  async createUser(data: CreateUserDto): Promise<User> {
    return this.save(data);
  }
}
