import { IOriginalError } from "@/types/error-response/graphql-error/originalError.response";

export interface IBackendErrorResponse {
  response: {
    data: unknown | null;
    errors: Array<{
      message: string;
      locations: Array<{ line: number; column: number }>;
      path: Array<string | number>;
      extensions: {
        code: string;
        stacktrace: string[];
        status: number;
        originalError: IOriginalError;
      };
    }>;
  };
}
