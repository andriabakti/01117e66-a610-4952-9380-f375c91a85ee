import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  BaseConfigModule,
  ThrottlerProvider,
} from './configs/base-config.module';
import { DatabaseModule } from './configs/database/database.module';
import { RedisModule } from './configs/redis/redis.module';
import { UserService } from './modules/users/user.service';
import { UserModule } from './modules/users/user.module';

@Module({
  imports: [BaseConfigModule, DatabaseModule, RedisModule, UserModule],
  controllers: [AppController],
  providers: [ThrottlerProvider, AppService, UserService],
})
export class AppModule {}
