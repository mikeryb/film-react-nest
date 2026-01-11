import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IFilm } from 'src/films/films.model';
import { FilmsRepository } from './films.repository';
import { MongoRepository } from 'typeorm';
import { Film } from 'src/entities/film.entity';

@Injectable()
export class FilmsMongoRepository implements FilmsRepository {
  constructor(
    @InjectRepository(Film)
    private readonly filmRepo: MongoRepository<Film>,
  ) {}

  async findAll(): Promise<IFilm[]> {
    const films = await this.filmRepo.find();

    return films;
  }

  async findById(id: string): Promise<IFilm> {
    const [film] = await this.filmRepo
      .aggregate([{ $match: { id } }])
      .toArray();
    return film;
  }
}
