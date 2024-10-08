import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './upload/file.module';

@Module({
  imports: [UserModule, AuthModule, FileModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
