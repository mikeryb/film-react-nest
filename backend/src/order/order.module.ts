import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderMongoRepository } from 'src/repository/mongo.order.repository';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { ORDER_REPOSITORY } from 'src/repository/order.repository';
import { OrderPostgresRepository } from 'src/repository/postgres.order.repository';
import { Film } from 'src/entities/film.entity';
import { Schedule } from 'src/entities/schedule.entity';

const dbType = process.env.DATABASE_DRIVER;

@Module({
  imports: [TypeOrmModule.forFeature([Film, Schedule])],
  controllers: [OrderController],
  providers: [
    OrderService,
    {
      provide: ORDER_REPOSITORY,
      useClass:
        dbType === 'mongodb' ? OrderMongoRepository : OrderPostgresRepository,
    },
  ],
  exports: [OrderService],
})
export class OrderModule {}
