import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaKnownClientExceptions } from './_common/prisma-exception.filter';

const PORT = process?.env?.PORT || 8080;


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //prisma setup errors
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaKnownClientExceptions(httpAdapter));

  await app.listen(PORT);
}
bootstrap();
