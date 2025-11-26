import { ValidationObjectType } from "@/core/types/error/graphql-error/object/validationObject.type";

export interface IOriginalError {
  isValidationError?: boolean;
  validation?: ValidationObjectType;
  
  message: string;
  error: string;
  statusCode: number;
}