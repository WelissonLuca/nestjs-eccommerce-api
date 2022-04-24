import * as crypto from 'crypto';

import { DefaultBaseEntity } from '../modules/common/base/entities/default-base-entity';
export const setBaseEntityValues = () => {
  const entity = new DefaultBaseEntity();
  entity.id = crypto.randomBytes(16).toString('hex');
  entity.createdAt = new Date();
  entity.updatedAt = new Date();
  entity.isActive = true;

  return entity;
};
