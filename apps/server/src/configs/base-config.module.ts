import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ThrottlerModule, minutes } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_KEY,
      signOptions: {
        expiresIn: process.env.JWT_TTL,
      },
    }),
    ThrottlerModule.forRoot([
      {
        ttl: minutes(+process.env.THROTTLER_LIMIT || 1),
        limit: +process.env.THROTTLER_LIMIT || 100,
      },
    ]),
  ],
})
export class BaseConfigModule {}
