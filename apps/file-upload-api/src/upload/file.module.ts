import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { Storage } from '@google-cloud/storage';

@Module({
  imports: [],
  controllers: [FileController],
  providers: [
    FileService,
    {
      provide: 'GCS_STORAGE', // Custom token to inject the Storage class
      useFactory: () => {
        const credentials = JSON.parse(
          process?.env?.GOOGLE_APPLICATION_CREDENTIALS || '',
        );

        // Initialize Google Cloud Storage with credentials from .env
        return new Storage({
          projectId: credentials.project_id,
          credentials: {
            ...credentials,
          },
        });
      },
    },
  ],
})
export class FileModule {}
