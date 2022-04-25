import { Injectable } from '@nestjs/common';
import { FreightProviderContracts } from '../../modules/common/contracts/providers/freight-provider.contracts';
import { freightApiConfig } from '../../config/freigth-api.config';
import { requestHandler } from '../../utils/request';
import { Product } from './../../modules/products/entities/product.entity';
import { CreateFreightDto } from './dtos/create-freight.dto';
import { FreightDto } from './dtos/freight.dto';

@Injectable()
export class FreightProvider implements FreightProviderContracts {
  async calculateFreight(data: CreateFreightDto): Promise<FreightDto> {
    const body = this.generateRequestBody(data);
    const url = 'me/shipment/calculate';
    const result = await requestHandler(freightApiConfig, url, body);

    return result as FreightDto;
  }

  private generateRequestBody(data: CreateFreightDto): any {
    const products = this.getProductsInfos(data.products);
    return {
      from: {
        postal_code: process.env.ORIGIN_ZIP_CODE,
      },
      to: {
        postal_code: data.destination,
      },
      products,
    };
  }

  private getProductsInfos(products: Product[]): any {
    return products.map((product) => {
      return {
        id: product.id,
        width: product.properties.width,
        height: product.properties.height,
        length: product.properties.length,
        weight: product.properties.weight,
        insurance_value: product.price,
        quantity: product.quantity,
      };
    });
  }
}
