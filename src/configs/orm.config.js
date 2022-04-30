module.exports = {
  name: 'default',
  type: 'postgres',
  host: process.env.PG_DB_HOST,
  port: Number(process.env.PG_DB_PORT),
  username: process.env.PG_DB_USER,
  password: String(process.env.PG_DB_PASSWORD),
  database: process.env.PG_DB_NAME,
  entities: [__dirname + '/../modules/**/entities/*.entity.{ts,js}'],
  dropSchema: false,
  synchronize: true,
  logging: false,
  migrations: [__dirname + '../database/migrations/**/*.{ts,js}'],
  cli: {
    entitiesDir: 'src/modules/**/entities',
    migrationsDir: `src/database/migrations`,
  },
};
