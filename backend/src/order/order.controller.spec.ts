import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderPostDto, OrderResponseDto } from './dto/order.dto';
import { BadRequestException } from '@nestjs/common';

const order: OrderPostDto = {
  email: 'test@example.com',
  phone: '+79990001122',
  tickets: [
    {
      film: 'film-1',
      session: 'session-1',
      daytime: '2026-02-01T18:00:00',
      day: '2026-02-01',
      time: '18:00',
      row: 5,
      seat: 7,
      price: 450,
    },
    {
      film: 'film-1',
      session: 'session-2',
      daytime: '2026-02-01T21:00:00',
      row: 3,
      seat: 4,
      price: 500,
    },
  ],
};

const mockResponse: OrderResponseDto = {
  total: 1,
  items: [
    {
      film: 'film-1',
      session: 'session-1',
      daytime: '2026-02-01T18:00:00',
      row: 5,
      seat: 7,
      price: 450,
      id: '12',
    },
  ],
};

describe('OrderController', () => {
  let controller: OrderController;
  let service: jest.Mocked<OrderService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [OrderService],
    })
      .overrideProvider(OrderService)
      .useValue({
        postOrder: jest.fn(),
      })
      .compile();

    controller = module.get<OrderController>(OrderController);
    service = module.get(OrderService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('postOrder() should call service and return OrderResponseDto', async () => {
    service.postOrder.mockResolvedValue(mockResponse);
    const result = await controller.create(order);
    expect(service.postOrder).toHaveBeenCalledWith(order);
    expect(result).toEqual(mockResponse);
  });

  it('create() should throw BadRequestException for invalid seat', async () => {
    const error = new BadRequestException('Место 3:4 уже занято');
    service.postOrder.mockRejectedValue(error);
    await expect(controller.create(order)).rejects.toThrow(BadRequestException);
    expect(service.postOrder).toHaveBeenCalledWith(order);
  });
});
