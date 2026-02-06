import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';


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
  
  it('getFilmById() should call method of service', async () => {
    await controller.getFilmById('id');
    expect(service.getFilmById).toHaveBeenCalledWith('id');
  });

  it('findAll() should call method of service', async () => {
    await controller.findAll();
    expect(service.getAllFilms).toHaveBeenCalled();
  });  
});
