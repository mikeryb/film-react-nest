import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderPostDto } from './dto/order.dto';

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

  it('postOrder() should call method of service', async () => {
    await controller.create(order);
    expect(service.postOrder).toHaveBeenCalledWith(order);
  })
});
