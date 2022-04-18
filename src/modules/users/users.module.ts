import { UserRepository } from './repositories/user.repository';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: 'UserRepository',
      useValue: UserRepository,
    },
  ],
})
export class UsersModule {}
