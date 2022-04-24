import { User } from './../entities/user.entity';
import { UpdateUserDto } from './../dtos/update-user.dto';
export interface UserRepositoryContracts {
  findOneByEmail(email: string): Promise<User>;
  create(user: any): Promise<User>;
  update(data: UpdateUserDto, email: string): Promise<void>;
}
