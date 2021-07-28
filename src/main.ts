import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/modules/app/app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService>(ConfigService);

  app.setGlobalPrefix(config.get<string>('api.prefix'));
  await app.listen(config.get<number>('api.port'));
}
bootstrap();
