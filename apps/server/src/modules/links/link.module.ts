import { DatabaseModule } from '@/configs/database/database.module';
import { RedisModule } from '@/configs/redis/redis.module';
import { Module } from '@nestjs/common';
import { LinkController } from './link.controller';
import { LinkService } from './link.service';

@Module({
  imports: [DatabaseModule, RedisModule],
  controllers: [LinkController],
  providers: [LinkService],
})
export class LinkModule {}
