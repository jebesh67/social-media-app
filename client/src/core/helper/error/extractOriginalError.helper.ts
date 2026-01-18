import { ClientError } from "graphql-request";
import { IBackendErrorResponse } from "@/core/types/error/graphql-error/response/backendError.response";
import { IOriginalError } from "@/core/types/error/graphql-error/response/originalError.response";

export const extractOriginalError = (error: ClientError): IOriginalError => {
  const backendError: IBackendErrorResponse = error as unknown as IBackendErrorResponse;
  return backendError.response.errors[0].extensions.originalError;
};