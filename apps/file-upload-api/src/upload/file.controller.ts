import {
  Controller,
  Get,
  HttpCode,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { FileListInterceptor } from './file-list.interceptor';

@Controller('files')
export class FileController {
  constructor(private fileService: FileService) {}

  @Post('upload')
  @HttpCode(201)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const res = await this.fileService.uploadFile(file);

    return { message: 'File uploaded successfully', ...res };
  }

  @Get('/')
  @UseInterceptors(new FileListInterceptor())
  async fileList() {
    const files = await this.fileService.listFiles();

    return { files };
  }
}
