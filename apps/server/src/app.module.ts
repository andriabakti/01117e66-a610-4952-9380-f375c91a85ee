import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BaseConfigModule } from './configs/base-config.module';
import { DatabaseModule } from './configs/database/database.module';
import { RedisModule } from './configs/redis/redis.module';

@Module({
  imports: [BaseConfigModule, DatabaseModule, RedisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
