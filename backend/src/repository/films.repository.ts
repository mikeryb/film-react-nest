import { IFilm } from 'src/films/films.model';

export interface FilmsRepository {
  findAll(): Promise<IFilm[]>;
  findById(id: string): Promise<IFilm>;
}

export const FILMS_REPOSITORY = 'FILMS_REPOSITORY';
