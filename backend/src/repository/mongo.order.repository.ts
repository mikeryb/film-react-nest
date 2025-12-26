import { Schema, Model } from 'mongoose';
import { IOrderRequest, IOrderTicket } from 'src/order/order.model';
import { OrderRepository } from './order.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IFilmDocument } from 'src/films/films.model';

export const OrderTicketSchema = new Schema<IOrderTicket>(
  {
    film: { type: String, required: true },
    session: { type: String, required: true },
    daytime: { type: String, required: true },
    day: { type: String, required: true },
    time: { type: String, required: true },
    row: { type: Number, required: true },
    seat: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  {
    _id: false,
  },
);

export const OrderSchema = new Schema<IOrderRequest>(
  {
    email: { type: String, required: true },
    phone: { type: String, required: true },
    tickets: {
      type: [OrderTicketSchema],
      required: true,
      validate: [(v: IOrderTicket[]) => v.length > 0, 'Не выбраны места'],
    },
  },
  {
    _id: false,
  },
);

@Injectable()
export class OrderMongoRepository implements OrderRepository {
  constructor(
    @InjectModel('Film') private readonly filmModel: Model<IFilmDocument>,
  ) {}

  async findFilmById(filmId: string): Promise<IFilmDocument> {
    const film = await this.filmModel.findOne({ id: filmId }).exec();
    if (!film) {
      throw new NotFoundException(`Фильм не найден`);
    }
    return film;
  }

  async postOrder(
    filmDoc: IFilmDocument,
    sessionId: string,
    seatStr: string,
  ): Promise<void> {
    const session = filmDoc.schedule.find((s) => s.id === sessionId);
    if (!session) throw new NotFoundException(`Сеанс не найден`);
    session.taken.push(seatStr);
    await filmDoc.save();
  }
}
