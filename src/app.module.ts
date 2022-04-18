import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { Validator } from './validators/validator';

@Global()
@Module({
  imports: [UsersModule],
  controllers: [AppController],
  providers: [AppService, Validator],
})
export class AppModule {}
