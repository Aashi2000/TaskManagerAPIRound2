import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '12345',
  database: 'postgres',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  /**
   * process.env.TYPEORM_SYNC will be set true for FIRST TIME
   * so that TYPEORM will create schema from entity definitions
   */
  synchronize: true,
};
