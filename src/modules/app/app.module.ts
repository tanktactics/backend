import { Module } from '@nestjs/common';
import config from 'config';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@/modules/prisma/prisma.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { EventModule } from '@/modules/event/event.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    PrismaModule,
    AuthModule,
    EventModule
  ],
})
export class AppModule {}
