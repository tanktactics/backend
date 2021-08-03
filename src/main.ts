import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/modules/app/app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from '@/filters/http-exception.filter';
import { Logger } from '@/utils/logger';
import { PrismaFilter } from '@/filters/prisma.filter';
import { ResponseInterceptor } from '@/interceptors/response.interceptor';
import { WsAdapter } from '@nestjs/platform-ws';

async function bootstrap() {
  const logger = new Logger('server');
  logger.log('starting server');

  const app = await NestFactory.create(AppModule, {
    logger,
  });

  const config = app.get<ConfigService>(ConfigService);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(config.get<string>('api.prefix'));
  app.useGlobalFilters(new HttpExceptionFilter(), new PrismaFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.enableVersioning();
  app.useWebSocketAdapter(new WsAdapter(app));

  await app.listen(config.get<number>('api.port'));
}
bootstrap();
