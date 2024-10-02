import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [UserModule, AuthModule, EventsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
