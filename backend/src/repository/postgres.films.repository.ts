import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IFilm } from 'src/films/films.model';
import { FilmsRepository } from './films.repository';
import { Repository } from 'typeorm';
import { Film } from 'src/entities/film.entity';

@Injectable()
export class FilmsPostgresRepository implements FilmsRepository {
  constructor(
    @InjectRepository(Film)
    private readonly filmRepo: Repository<Film>,
  ) {}

  async findAll(): Promise<IFilm[]> {
    const films = await this.filmRepo.find();
    return films;
  }

  async findById(id: string): Promise<IFilm> {
    const film = await this.filmRepo.findOne({
      where: { id },
      relations: ['schedule'],
    });

    if (!film) {
      throw new NotFoundException(`Фильм с id ${id} не найден`);
    }

    film.schedule.sort((a, b) => {
      return new Date(a.daytime).getTime() - new Date(b.daytime).getTime();
    });

    return film;
  }
}
