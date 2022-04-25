import { FreightProvider } from './freight/freight.provider';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  imports: [],
  providers: [FreightProvider],
})
export class ProviderModule {}
