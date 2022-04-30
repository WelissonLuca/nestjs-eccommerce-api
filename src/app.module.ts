import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { Validator } from './validators/validator';
import { ProductsModule } from './modules/products/products.module';
import { OrdersModule } from './modules/orders/orders.module';
import { ProviderModule } from './providers/provider.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
    ProductsModule,
    OrdersModule,
    ProviderModule,
  ],
  controllers: [AppController],
  providers: [AppService, Validator],
  exports: [Validator],
})
export class AppModule {}
