import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { ThrottlerGuard, ThrottlerModule, minutes } from '@nestjs/throttler';

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

// provider -> throttler
export const ThrottlerProvider = {
  provide: APP_GUARD,
  useClass: ThrottlerGuard,
};
