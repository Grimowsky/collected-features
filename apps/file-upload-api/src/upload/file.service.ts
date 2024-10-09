import { Inject, Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';

const bucketName = 'file-upload-api';

@Injectable()
export class FileService {
  constructor(@Inject('GCS_STORAGE') private storage: Storage) {}

  private suffixFileName(name: string) {
    const [extension, ...restName] = name.split('.').reverse();
    return restName + '_' + crypto.randomUUID() + '.' + extension;
  }
  async uploadFile(fileToUpload: Express.Multer.File) {
    const fileName = this.suffixFileName(fileToUpload.originalname);
    await this.storage
      .bucket(bucketName)
      .file(fileName)
      .save(fileToUpload.buffer, {
        metadata: {},
      });

    return { name: fileName };
  }

  async listFiles() {
    const [files] = await this.storage.bucket(bucketName).getFiles();

    return files;
  }
}
