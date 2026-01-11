import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { FilmsMongoRepository } from '../repository/mongo.films.repository';
import { FILMS_REPOSITORY } from 'src/repository/films.repository';

import { FilmsPostgresRepository } from 'src/repository/postgres.films.repository';
import { Film } from 'src/entities/film.entity';
import { Schedule } from 'src/entities/schedule.entity';

const dbType = process.env.DATABASE_DRIVER;

@Module({
  imports: [TypeOrmModule.forFeature([Film, Schedule])],
  controllers: [FilmsController],
  providers: [
    FilmsService,
    {
      provide: FILMS_REPOSITORY,
      useClass:
        dbType === 'mongodb' ? FilmsMongoRepository : FilmsPostgresRepository,
    },
  ],
  exports: [FilmsService],
})
export class FilmsModule {}
