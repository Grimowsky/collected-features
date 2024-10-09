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
  data: FileList[];
}
@Injectable()
export class FileListInterceptor implements NestInterceptor<GetFilesResponse> {
  intercept(
    _context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response> {
    return next.handle().pipe(
      map((data: { files: GsFile[] }) => {
        return { data: this.mapFilesToResponse(data.files) };
      }),
    );
  }
  private mapFilesToResponse(files: GsFile[]): FileList[] {
    return files.map((f) => ({
      name: f.metadata.name,
    }));
  }
}
