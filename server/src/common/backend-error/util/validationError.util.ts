import { ValidationObjectType } from '@/common/type/validation/validationObject.type';
import { HttpException, HttpStatus } from '@nestjs/common';
import { IValidationError } from '@/common/backend-error/type/validationError.interface';

export class HandleValidationError extends HttpException {
  constructor(
    data: ValidationObjectType,
    message: string,
    error: string,
    statusCode: number,
  ) {
    super(
      {
        isValidationError: true,
        validation: data,
        message,
        error,
        statusCode,
      } as IValidationError,
      statusCode,
    );
  }

  static BadInput(data: ValidationObjectType): HandleValidationError {
    return new HandleValidationError(
      data,
      'Validation error!',
      'Bad Request',
      HttpStatus.BAD_REQUEST,
    );
  }
}
