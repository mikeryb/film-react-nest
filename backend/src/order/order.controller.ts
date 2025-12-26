import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderPostDto, OrderResponseDto } from './dto/order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @HttpCode(200)
  async create(@Body() order: OrderPostDto): Promise<OrderResponseDto> {
    return this.orderService.postOrder(order);
  }
}
