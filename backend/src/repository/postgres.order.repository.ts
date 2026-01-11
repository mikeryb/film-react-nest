import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderRepository } from './order.repository';
import { IFilm } from 'src/films/films.model';
import { Film } from 'src/entities/film.entity';

@Injectable()
export class OrderPostgresRepository implements OrderRepository {
  constructor(
    @InjectRepository(Film)
    private readonly filmRepo: Repository<Film>,
  ) {}

  async findFilmById(id: string): Promise<IFilm> {
    const film = await this.filmRepo.findOne({
      where: { id },
      relations: ['schedule'],
    });

    if (!film) {
      throw new NotFoundException(`Фильм с id ${id} не найден`);
    }
    return film;
  }

  async postOrder(
    filmDoc: IFilm,
    sessionId: string,
    seatStr: string,
  ): Promise<void> {
    const session = filmDoc.schedule.find((s) => s.id === sessionId);
    if (!session) throw new NotFoundException('Сеанс не найден');
    if (!Array.isArray(session.taken)) session.taken = [];
    if (!session.taken.includes(seatStr)) {
      session.taken.push(seatStr);
    }
    await this.filmRepo.save(filmDoc);
  }
}
