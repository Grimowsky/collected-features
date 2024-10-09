import { Inject, Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';

const bucketName = 'file-upload-api';

@Injectable()
export class FileService {
  constructor(@Inject('GCS_STORAGE') private storage: Storage) {}

  async uploadFile(fileToUpload: Express.Multer.File) {
    await this.storage
      .bucket(bucketName)
      .file(fileToUpload.originalname)
      .save(fileToUpload.buffer, { metadata: { uuid: crypto.randomUUID() } });
  }

  async listFiles() {
    const [files] = await this.storage.bucket(bucketName).getFiles();

    return files;
  }
}
