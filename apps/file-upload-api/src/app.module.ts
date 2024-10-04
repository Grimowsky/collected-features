import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [UserModule, AuthModule, UploadModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
