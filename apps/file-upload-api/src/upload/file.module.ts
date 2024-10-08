import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { Storage } from '@google-cloud/storage';

@Module({
  imports: [],
  controllers: [FileController],
  providers: [FileService, Storage],
})
export class FileModule {}
