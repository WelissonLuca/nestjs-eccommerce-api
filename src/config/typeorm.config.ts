import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.PG_DB_HOST,
  port: Number(process.env.PG_DB_PORT),
  username: process.env.PG_DB_USER,
  password: String(process.env.PG_DB_PASSWORD),
  database: process.env.PG_DB_NAME,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
  logging: true,
  logger: 'advanced-console',
  migrations: [__dirname + '/database/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',
  migrationsRun: true,
  poolErrorHandler: (err: any) => {
    console.error(err);
    throw new Error('Database connection error');
  },
  subscribers: [__dirname + '/database/subscriber/*{.ts,.js}'],
  installExtensions: true,
};
