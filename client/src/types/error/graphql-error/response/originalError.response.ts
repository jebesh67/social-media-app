import { ValidationObjectType } from "@/types/error/graphql-error/object/validationObject.type";

export interface IOriginalError {
  isValidationError?: boolean;
  validation?: ValidationObjectType;
  
  message: string;
  error: string;
  statusCode: number;
}