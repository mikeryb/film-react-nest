import { Schema, Model } from 'mongoose';
import { IFilm, ISchedule, IFilmDocument } from 'src/films/films.model';
import { FilmsRepository } from './films.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

export const ScheduleSchema = new Schema<ISchedule>(
  {
    id: { type: String, required: true },
    daytime: { type: String, required: true },
    hall: { type: Number, required: true },
    rows: { type: Number, required: true },
    seats: { type: Number, required: true },
    price: { type: Number, required: true },
    taken: { type: [String], default: [] },
  },
  { _id: false },
);

export const FilmSchema = new Schema<IFilm>(
  {
    id: { type: String, required: true, index: true },
    rating: { type: Number, required: true },
    director: { type: String, required: true },
    tags: { type: [String], required: true },
    image: { type: String, required: true },
    cover: { type: String, required: true },
    title: { type: String, required: true },
    about: { type: String, required: true },
    description: { type: String, required: true },
    schedule: { type: [ScheduleSchema], default: [] },
  },
  {
    collection: 'films',
  },
);

@Injectable()
export class FilmsMongoRepository implements FilmsRepository {
  constructor(
    @InjectModel('Film') private readonly filmModel: Model<IFilmDocument>,
  ) {}
  async findAll(): Promise<IFilm[]> {
    const films = await this.filmModel.find({}).exec();
    return films;
  }

  async findById(id: string): Promise<IFilm> {
    const film = await this.filmModel.findOne({ id }).exec();
    return film;
  }
}
