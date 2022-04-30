import { UpdateUserDto } from 'src/modules/users/dtos/update-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserModel } from './../common/models/user.model';
import { UserServiceContracts } from './../common/contracts/services/user-service.cotracts';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(
    @Inject('UsersService')
    private readonly usersService: UserServiceContracts,
  ) {}

  @Post('/')
  async createUser(@Body() data: CreateUserDto): Promise<UserModel> {
    const user = await this.usersService.createUser(data);

    return new UserModel(user);
  }

  @Get('/:email')
  async findByEmail(@Param('email') email: string): Promise<UserModel> {
    const user = await this.usersService.findByEmail(email);

    return new UserModel(user);
  }

  @Put('/')
  async updateUser(
    @Param('email') email: string,
    @Body() data: UpdateUserDto,
  ): Promise<void> {
    await this.usersService.updateUser(data, email);
  }
}
