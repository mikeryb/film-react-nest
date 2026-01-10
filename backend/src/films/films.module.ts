import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import {
  FilmsMongoRepository,
  FilmSchema,
} from '../repository/mongo.films.repository';
import { FILMS_REPOSITORY } from 'src/repository/films.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Film', schema: FilmSchema }])],
  controllers: [FilmsController],
  providers: [
    FilmsService,
    {
      provide: FILMS_REPOSITORY,
      useClass: FilmsMongoRepository,
    },
  ],
  exports: [FilmsService],
})
export class FilmsModule {}
