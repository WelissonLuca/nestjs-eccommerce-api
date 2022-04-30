import { randomBytes } from 'crypto';
import {
  BaseEntity,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
} from 'typeorm';

export class DefaultBaseEntity extends BaseEntity {
  @PrimaryColumn({
    type: 'uuid',
  })
  id: string;
  @CreateDateColumn({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
  @UpdateDateColumn({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
  @DeleteDateColumn({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  deletedAt: Date;
  @Column({
    default: false,
  })
  isActive: boolean;

  constructor() {
    super();
    this.id = randomBytes(16).toString('hex');
  }
}
