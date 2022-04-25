import { CreateFreightDto } from '../../../../providers/freight/dtos/create-freight.dto';
import { FreightDto } from '../../../../providers/freight/dtos/freight.dto';

export interface FreightProviderContracts {
  calculateFreight(data: CreateFreightDto): Promise<FreightDto>;
}
