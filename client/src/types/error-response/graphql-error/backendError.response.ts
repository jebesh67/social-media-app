import { IOriginalError } from "@/types/error-response/graphql-error/originalError.response";

export interface IBackendErrorResponse {
  response: {
    data: any | null;
    errors: Array<{
      message: string;
      locations: any[];
      path: any[];
      extensions: {
        code: string;
        stacktrace?: string[];
        originalError: IOriginalError;
      };
    }>;
  };
}
