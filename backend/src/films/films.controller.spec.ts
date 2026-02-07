import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { IFilm, ISchedule } from './films.model';

const mockSchedule1: ISchedule = {
  id: 's1',
  daytime: '2026-02-07T18:00:00Z',
  hall: 1,
  rows: 10,
  seats: 15,
  price: 300,
  taken: ['A1', 'B2'],
};

const mockSchedule2: ISchedule = {
  id: 's2',
  daytime: '2026-02-08T20:00:00Z',
  hall: 2,
  rows: 12,
  seats: 20,
  price: 400,
  taken: ['C3', 'D4'],
};

const mockFilm1: IFilm = {
  id: 'f1',
  rating: 8.5,
  director: 'Director One',
  tags: ['action', 'adventure'],
  image: 'poster1.jpg',
  cover: 'cover1.jpg',
  title: 'Test Film One',
  about: 'About the first test film',
  description: 'Description of the first test film',
  schedule: [mockSchedule1],
};

const mockFilm2: IFilm = {
  id: 'f2',
  rating: 7.8,
  director: 'Director Two',
  tags: ['comedy', 'drama'],
  image: 'poster2.jpg',
  cover: 'cover2.jpg',
  title: 'Test Film Two',
  about: 'About the second test film',
  description: 'Description of the second test film',
  schedule: [mockSchedule2],
};

const mockFilms: IFilm[] = [mockFilm1, mockFilm2];

describe('FilmsController', () => {
  let controller: FilmsController;
  let service: jest.Mocked<FilmsService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [FilmsService],
    })
      .overrideProvider(FilmsService)
      .useValue({
        getFilmById: jest.fn(),
        getAllFilms: jest.fn(),
      })
      .compile();

    controller = module.get<FilmsController>(FilmsController);
    service = module.get(FilmsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getFilmById() should return FilmResponseDto', async () => {
    const film = mockFilm1;
    service.getFilmById.mockResolvedValue({
      total: film.schedule.length,
      items: film.schedule,
    });
    const result = await controller.getFilmById(film.id);
    expect(service.getFilmById).toHaveBeenCalledWith(film.id);
    expect(result).toEqual({
      total: film.schedule.length,
      items: film.schedule,
    });
  });

  it('findAll() should return FilmsResponseDto', async () => {
    service.getAllFilms.mockResolvedValue({
      total: mockFilms.length,
      items: mockFilms,
    });
    const result = await controller.findAll();
    expect(service.getAllFilms).toHaveBeenCalled();
    expect(result).toEqual({ total: mockFilms.length, items: mockFilms });
  });
});
