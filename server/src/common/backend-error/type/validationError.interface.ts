import { ValidationObjectType } from '@/common/types/validation/validationObject.type';

export interface IValidationError {
  isValidationError: boolean;
  validation: ValidationObjectType;
  message: string;
  error: string;
  statusCode: number;
}
