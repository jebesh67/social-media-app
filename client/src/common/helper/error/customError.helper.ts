import { ValidationObjectType } from "@/types/error/graphql-error/object/validationObject.type";
import { IApiError } from "@/types/error/api-error/response/apiError.response";

export class CustomError extends Error {
  success: boolean;
  statusCode: number;
  isValidationError?: boolean;
  validation?: ValidationObjectType;
  
  constructor({
    message = "Internal server error!",
    statusCode = 500,
    success = false,
    isValidationError,
    validation,
  }: Partial<IApiError>) {
    super(message);
    this.name = "Custom Error";
    this.success = success;
    this.statusCode = statusCode;
    this.isValidationError = isValidationError;
    this.validation = validation;
    
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }
  }
}
