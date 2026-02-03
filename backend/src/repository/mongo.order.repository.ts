import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { OrderRepository } from './order.repository';
import { IFilm } from 'src/films/films.model';
import { Film } from 'src/entities/film.entity';

@Injectable()
export class OrderMongoRepository implements OrderRepository {
  constructor(
    @InjectRepository(Film)
    private readonly filmRepo: MongoRepository<Film>,
  ) {}

  async findFilmById(filmId: string): Promise<Film> {
    const [film] = await this.filmRepo
      .aggregate([{ $match: { id: filmId } }])
      .toArray();
    if (!film) throw new NotFoundException(`Фильм не найден`);
    return film;
  }

  async postOrder(
    filmDoc: IFilm,
    sessionId: string,
    seatStr: string,
  ): Promise<void> {
    const result = await this.filmRepo.updateOne(
      { id: filmDoc.id, 'schedule.id': sessionId },
      { $addToSet: { 'schedule.$.taken': seatStr } } as any,
    );

    if (result.matchedCount === 0) {
      throw new NotFoundException('Фильм или сеанс не найден');
    }
  }
}
