import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';

const bucketName = 'file-upload-api';

@Injectable()
export class FileService {
  constructor(private storage: Storage) {}

  async uploadFile(fileToUpload: Express.Multer.File) {
    await this.storage
      .bucket(bucketName)
      .file(fileToUpload.originalname)
      .save(fileToUpload.buffer, {});
  }

  async listFiles() {
    const list = await this.storage.bucket(bucketName).getFiles();

    return list;
  }
}
