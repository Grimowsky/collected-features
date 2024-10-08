import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { Storage } from '@google-cloud/storage';

@Module({
  imports: [],
  controllers: [UploadController],
  providers: [UploadService, Storage],
})
export class UploadModule {}
