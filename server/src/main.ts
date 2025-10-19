import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { ValidationPipe } from '@nestjs/common';
import { BackendError } from '@/common/backend-error/util/backendError.util';
import { ValidationError } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]): BackendError => {
        const message: string = errors
          .map((err: ValidationError): string =>
            Object.values(err.constraints || {}).join(', '),
          )
          .join('; ');

        return BackendError.BadRequest(message);
      },
    }),
  );

  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
