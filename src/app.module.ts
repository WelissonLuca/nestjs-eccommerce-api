import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { Validator } from './validators/validator';
import { ProductsModule } from './modules/products/products.module';
import { OrdersModule } from './modules/orders/orders.module';
import { ProviderModule } from './providers/provider.module';

@Global()
@Module({
  imports: [UsersModule, ProductsModule, OrdersModule, ProviderModule],
  controllers: [AppController],
  providers: [AppService, Validator],
})
export class AppModule {}
