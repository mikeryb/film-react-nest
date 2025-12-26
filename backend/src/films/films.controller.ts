import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  async findAll() {
    return await this.filmsService.getAllFilms();
  }

  @Get(':id/schedule')
  async getFilmById(@Param('id') id: string) {
    return await this.filmsService.getFilmById(id);
  }
}
