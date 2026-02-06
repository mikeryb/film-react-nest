import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import 'dotenv/config';
import { DevLogger } from './logger/devLogger';
import { JsonLogger } from './logger/jsonLogger';
import { TskvLogger } from './logger/TSKVLogger';

function getLogger(app: INestApplication) {
  const type = process.env.LOGGER_TYPE;

  switch (type) {
    case 'json':
      return app.get(JsonLogger);

    case 'tskv':
      return app.get(TskvLogger);

    case 'dev':
    default:
      return app.get(DevLogger);
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const logger =  getLogger(app);
  app.useLogger(logger);
  app.setGlobalPrefix('api/afisha');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
