import { IFilm } from 'src/films/films.model';

export interface OrderRepository {
  findFilmById(filmId: string): Promise<IFilm>;
  postOrder(filmDoc: IFilm, sessionId: string, seatStr: string): Promise<void>;
}

export const ORDER_REPOSITORY = 'ORDER_REPOSITORY';
