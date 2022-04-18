import { UpdateUserDto } from './../dtos/update-user.dto';
export interface UserRepositoryContracts {
  findOneByEmail(email: string): Promise<any>;
  create(user: any): Promise<any>;
  update(data: UpdateUserDto, email: string): Promise<any>;
}
