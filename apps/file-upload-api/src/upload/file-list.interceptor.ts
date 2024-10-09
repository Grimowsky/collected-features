import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetFilesResponse, File as GsFile } from '@google-cloud/storage';

type FileList = {
  name?: string;
};

export interface Response {
  files: FileList[];
}

@Injectable()
export class FileListInterceptor implements NestInterceptor<GetFilesResponse> {
  intercept(
    _context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response> {
    return next.handle().pipe(
      map((data: { files: GsFile[] }) => {
        return { files: this.mapFilesToResponse(data.files) };
      }),
    );
  }
  private getFileExtension(name: string) {
    return name.split('.').reverse()[0];
  }
  private mapFilesToResponse(files: GsFile[]): FileList[] {
    return files.map((f) => ({
      name: f.metadata.name,
      mimetype: f.metadata.contentType,
      extension: this.getFileExtension(f.name),
      uploadDate: f.metadata.timeCreated,
    }));
  }
}
