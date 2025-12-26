import { IFilmDocument } from 'src/films/films.model';

export interface OrderRepository {
  findFilmById(filmId: string): Promise<IFilmDocument>;
  postOrder(
    filmDoc: IFilmDocument,
    sessionId: string,
    seatStr: string,
  ): Promise<void>;
}

export const ORDER_REPOSITORY = 'ORDER_REPOSITORY';
