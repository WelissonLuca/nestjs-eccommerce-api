import faker from '@faker-js/faker';
import * as crypto from 'crypto';

export const mockedProducts = [
  {
    id: faker.datatype.uuid(),
    name: faker.internet.domainName(),
    description: faker.random.words(3),
    price: Math.floor(Math.random() * 100),
    thumb: faker.image.business(),
    categoryId: faker.datatype.uuid(),
    quantity: Math.floor(Math.random() * 100),
    properties: {
      width: Math.floor(Math.random() * 100),
      height: Math.floor(Math.random() * 100),
      length: Math.floor(Math.random() * 100),
      weight: Math.floor(Math.random() * 100),
    },
  },
  {
    id: faker.datatype.uuid(),
    name: faker.internet.domainName(),
    description: faker.random.words(3),
    price: Math.floor(Math.random() * 100),
    thumb: faker.image.business(),
    categoryId: faker.datatype.uuid(),
    quantity: Math.floor(Math.random() * 100),
    properties: {
      width: Math.floor(Math.random() * 100),
      height: Math.floor(Math.random() * 100),
      length: Math.floor(Math.random() * 100),
      weight: Math.floor(Math.random() * 100),
    },
  },
  {
    id: faker.datatype.uuid(),
    name: faker.internet.domainName(),
    description: faker.random.words(3),
    price: Math.floor(Math.random() * 100),
    thumb: faker.image.business(),
    categoryId: faker.datatype.uuid(),
    quantity: Math.floor(Math.random() * 100),
    properties: {
      width: Math.floor(Math.random() * 100),
      height: Math.floor(Math.random() * 100),
      length: Math.floor(Math.random() * 100),
      weight: Math.floor(Math.random() * 100),
    },
  },
  {
    id: faker.datatype.uuid(),
    name: faker.internet.domainName(),
    description: faker.random.words(3),
    price: Math.floor(Math.random() * 100),
    thumb: faker.image.business(),
    categoryId: faker.datatype.uuid(),
    quantity: Math.floor(Math.random() * 100),
    properties: {
      width: Math.floor(Math.random() * 100),
      height: Math.floor(Math.random() * 100),
      length: Math.floor(Math.random() * 100),
      weight: Math.floor(Math.random() * 100),
    },
  },
];
