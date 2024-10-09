import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaKnownClientExceptions } from './_common/prisma-exception.filter';

const PORT = process?.env?.PORT || 8080;
const STORAGE_AUTH = process?.env?.GOOGLE_APPLICATION_CREDENTIALS || '';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableShutdownHooks();

  //prisma setup errors
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaKnownClientExceptions(httpAdapter));

  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true,
  });

  await app.listen(8080);
  console.log('@@@', JSON.parse(STORAGE_AUTH));
  console.log(`Server is running on http://localhost:${PORT}`);
}
bootstrap();
