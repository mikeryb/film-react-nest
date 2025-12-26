import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  OrderMongoRepository,
  OrderSchema,
} from 'src/repository/mongo.order.repository';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { ORDER_REPOSITORY } from 'src/repository/order.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Film', schema: OrderSchema }])],
  controllers: [OrderController],
  providers: [
    OrderService,
    {
      provide: ORDER_REPOSITORY,
      useClass: OrderMongoRepository,
    },
  ],
  exports: [OrderService],
})
export class OrderModule {}
