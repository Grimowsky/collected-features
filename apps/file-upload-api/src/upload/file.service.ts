import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import {
  DownloadResponse,
  GetFileResponse,
  Storage,
} from '@google-cloud/storage';

const bucketName = 'file-upload-api';

@Injectable()
export class FileService {
  constructor(@Inject('GCS_STORAGE') private storage: Storage) {}

  private suffixFileName(name: string) {
    const [extension, ...restName] = name.split('.').reverse();
    return restName + '_' + crypto.randomUUID() + '.' + extension;
  }
  private getFileExtension(name: string) {
    return name.split('.').reverse()[0];
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
  private async getFileMetadata(fileName: string) {
    const [metadata] = await this.storage
      .bucket(bucketName)
      .file(fileName)
      .getMetadata();
    return metadata;
  }
  async download(
    fileName: string,
  ): Promise<{ file: Buffer; mimeType?: string; name?: string }> {
    const [file] = await this.storage
      .bucket(bucketName)
      .file(fileName)
      .download();

    const metadata = await this.getFileMetadata(fileName);

    if (!file) {
      throw new HttpException('File not found', HttpStatus.NOT_FOUND);
    }

    return {
      mimeType: metadata.contentType,
      name: metadata.name,
      file,
    };
  }
}
