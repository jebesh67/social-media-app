import { ValidationObjectType } from '@/common/type/validation/validationObject.type';

export interface IValidationError {
  isValidationError: boolean;
  validation: ValidationObjectType;
  message: string;
  error: string;
  statusCode: number;
}
