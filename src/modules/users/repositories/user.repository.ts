import { CreateUserDto } from './../dtos/create-user.dto';
import { EntityRepository, Repository } from 'typeorm';
import { UserRepositoryContracts } from '../contracts/user-repository.contract';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { User } from '../entities/user.entity';

@EntityRepository(User)
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
  async findByEmail(email: string): Promise<User> {
    return this.findOne({
      where: {
        email,
      },
    });
  }
  async createUser(data: CreateUserDto): Promise<User> {
    return this.save(data);
  }
}
