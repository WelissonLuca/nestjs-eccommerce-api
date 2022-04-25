import { BaseEntity } from 'typeorm';

export class DefaultBaseEntity extends BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  isActive: boolean;
}
