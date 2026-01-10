import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import {
  ORDER_REPOSITORY,
  OrderRepository,
} from 'src/repository/order.repository';
import {
  OrderPostDto,
  OrderResponseDto,
  OrderItemResponseDto,
} from './dto/order.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class OrderService {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly repository: OrderRepository,
  ) {}

  async postOrder(order: OrderPostDto): Promise<OrderResponseDto> {
    const responseItems: OrderItemResponseDto[] = [];

    for (const ticket of order.tickets) {
      const filmDoc = await this.repository.findFilmById(ticket.film);

      const session = filmDoc.schedule.find((s) => s.id === ticket.session);
      if (!session)
        throw new BadRequestException(`Сеанс ${ticket.session} не найден`);

      const seat = `${ticket.row}:${ticket.seat}`;
      if (session.taken.includes(seat)) {
        throw new BadRequestException(`Место ${seat} уже занято`);
      }

      await this.repository.postOrder(filmDoc, ticket.session, seat);

      responseItems.push({
        film: ticket.film,
        session: ticket.session,
        daytime: ticket.daytime,
        row: ticket.row,
        seat: ticket.seat,
        price: ticket.price,
        id: randomUUID(),
      });
    }

    return {
      total: responseItems.length,
      items: responseItems,
    };
  }
}
