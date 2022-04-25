export class FreightDto {
  id: string;
  name: string;
  price: number;
  custom_price: number;
  discount: number;
  currency: string;
  delivery_time: number;
  delivery_range: {
    min: number;
    max: number;
  };
  custom_delivery_time: number;
  custom_delivery_range: {
    min: number;
    max: number;
  };
  packages: [
    {
      price: number;
      discount: number;
      format: string;
      weight: number;
      insurance_value: number;
      products: [
        {
          id: string;
          quantity: number;
        },
      ];
      dimensions: {
        height: number;
        width: number;
        length: number;
      };
    },
  ];
  additional_services: {
    receipt: false;
    own_hand: false;
    collect: false;
  };
  company: {
    id: number;
    name: string;
    picture: string;
  };
}
