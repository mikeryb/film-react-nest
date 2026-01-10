import { IFilm, ISchedule } from '../films.model';

export class FilmsResponseDto {
  total: number;
  items: IFilm[];
}

export class FilmResponseDto {
  total: number;
  items: ISchedule[];
}
