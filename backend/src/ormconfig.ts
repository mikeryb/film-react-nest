import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { Film } from './entities/film.entity';
import { Schedule } from './entities/schedule.entity';

config();

const isMongo = process.env.DATABASE_DRIVER === 'mongodb';

export const ormConfig: TypeOrmModuleOptions | any = isMongo
  ? {
      type: 'mongodb',
      url: process.env.DATABASE_URL,
      useUnifiedTopology: true,
      entities: [Film, Schedule],
      synchronize: true,
    }
  : {
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Film, Schedule],
      synchronize: true,
    };
