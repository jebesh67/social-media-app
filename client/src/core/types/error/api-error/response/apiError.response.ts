import { ValidationObjectType } from "@/core/types/error/graphql-error/object/validationObject.type";

export interface IApiError {
  success: boolean;
  message: string;
  statusCode: number;
  
  isValidationError?: boolean;
  validation?: ValidationObjectType;
}