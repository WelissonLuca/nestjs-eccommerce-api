import { UpdateUserDto } from '../../../users/dtos/update-user.dto';
import { CreateUserDto } from '../../../users/dtos/create-user.dto';
import { User } from '../../../users/entities/user.entity';

export interface UserServiceContracts {
  findByEmail(id: string): Promise<User>;
  createUser(data: CreateUserDto): Promise<User>;
  updateUser(data: UpdateUserDto, email: string): Promise<void>;
}
