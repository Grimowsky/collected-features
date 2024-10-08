import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';

const bucketName = 'file-upload-api';

@Injectable()
export class UploadService {
  constructor(private storage: Storage) {}

  async uploadFile(fileToUpload: Express.Multer.File) {
    await this.storage
      .bucket(bucketName)
      .file(fileToUpload.originalname)
      .save(fileToUpload.buffer, {});
  }
}
