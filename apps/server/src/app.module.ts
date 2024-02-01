import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthMiddleware } from './commons/middlewares/auth.middleware';
import {
  BaseConfigModule,
  ThrottlerProvider,
} from './configs/base-config.module';
import { DatabaseModule } from './configs/database/database.module';
import { RedisModule } from './configs/redis/redis.module';
import { LinkController } from './modules/links/link.controller';
import { LinkModule } from './modules/links/link.module';
import { LinkService } from './modules/links/link.service';
import { UserModule } from './modules/users/user.module';

@Module({
  imports: [
    BaseConfigModule,
    DatabaseModule,
    RedisModule,
    UserModule,
    LinkModule,
  ],
  controllers: [AppController],
  providers: [ThrottlerProvider, AppService, LinkService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(LinkController);
  }
}
