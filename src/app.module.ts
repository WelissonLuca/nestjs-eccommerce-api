import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { Validator } from './validators/validator';
import { ProductsModule } from './modules/products/products.module';

@Global()
@Module({
  imports: [UsersModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService, Validator],
})
export class AppModule {}
