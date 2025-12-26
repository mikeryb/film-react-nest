import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import {
  FILMS_REPOSITORY,
  FilmsRepository,
} from 'src/repository/films.repository';
import { FilmsResponseDto, FilmResponseDto } from './dto/films.dto';

@Injectable()
export class FilmsService {
  constructor(
    @Inject(FILMS_REPOSITORY)
    private readonly repository: FilmsRepository,
  ) {}

  async getAllFilms(): Promise<FilmsResponseDto> {
    const films = await this.repository.findAll();

    return {
      total: films.length,
      items: films,
    };
  }

  async getFilmById(id: string): Promise<FilmResponseDto> {
    const film = await this.repository.findById(id);

    if (!film) {
      throw new NotFoundException('Film not found');
    }

    return {
      total: film.schedule.length,
      items: film.schedule,
    };
  }
}
