import { HttpException, HttpStatus } from '@nestjs/common';
import { IBackendError } from '@/common/backend-error/type/backendError.interface';
import { ValidationObjectType } from '@/common/types/validation/validationObject.type';

export class BackendError extends HttpException {
  constructor(message: string, error: string, statusCode: number) {
    super({ message, error, statusCode } as IBackendError, statusCode);
  }

  static BadRequest(message: string): BackendError {
    return new BackendError(message, 'Bad Request', HttpStatus.BAD_REQUEST);
  }

  static NotFound(message: string): BackendError {
    return new BackendError(message, 'Not Found', HttpStatus.NOT_FOUND);
  }

  static Internal(message: string): BackendError {
    return new BackendError(
      message,
      'Internal Server Error',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  static Unauthorized(message: string): BackendError {
    return new BackendError(message, 'Unauthorized', HttpStatus.UNAUTHORIZED);
  }

  static Conflict(message: string): BackendError {
    return new BackendError(message, 'Conflict', HttpStatus.CONFLICT);
  }
}
