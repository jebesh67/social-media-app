import { ValidationObjectType } from "@/types/error/graphql-error/object/validationObject.type";
import { IApiError } from "@/types/error/api-error/response/apiError.response";

export class ApiError extends Error {
  success: boolean;
  statusCode: number;
  isValidationError?: boolean;
  validation?: ValidationObjectType;
  
  constructor({
    message,
    statusCode,
    success = false,
    isValidationError,
    validation,
  }: IApiError) {
    super(message);
    this.name = "Validation Error!";
    this.success = success;
    this.statusCode = statusCode;
    this.isValidationError = isValidationError;
    this.validation = validation;
    
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }
}
