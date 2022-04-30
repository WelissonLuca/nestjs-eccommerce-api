import { CreateUserDto } from './../dtos/create-user.dto';
import { User } from './../entities/user.entity';
import { UpdateUserDto } from './../dtos/update-user.dto';
export interface UserRepositoryContracts {
  findOneByEmail(email: string): Promise<User>;
  createUser(data: CreateUserDto): Promise<User>;
  updateUser(data: UpdateUserDto, email: string): Promise<void>;
}
