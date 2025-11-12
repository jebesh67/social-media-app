import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { ValidationPipe } from '@nestjs/common';
import { BackendError } from '@/common/backend-error/util/backendError.util';
import { ValidationError } from 'class-validator';
import { HandleValidationError } from '@/common/backend-error/util/validationError.util';
import { ValidationObjectType } from '@/common/types/validation/validationObject.type';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: `${process.env.CLIENT_URL}`,
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: false,

      exceptionFactory: (errors: ValidationError[]): BackendError => {
        const formattedErrors: ValidationObjectType = {};

        for (const err of errors) {
          if (err.constraints) {
            formattedErrors[err.property] = Object.values(err.constraints);
          }
        }

        return HandleValidationError.BadInput(formattedErrors);
      },
    }),
  );

  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
