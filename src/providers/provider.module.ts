import { FreightProvider } from './freight/freight.provider';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  imports: [],
  providers: [
    {
      provide: 'FreightProvider',
      useClass: FreightProvider,
    },
  ],
  exports: ['FreightProvider'],
})
export class ProviderModule {}
