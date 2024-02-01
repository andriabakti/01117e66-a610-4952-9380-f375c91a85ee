import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BaseConfigModule } from './configs/base-config.module';

@Module({
  imports: [BaseConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
