import { getAuthToken } from "@/common/utils/cookie/cookie.helper";
import { ClientError, request } from "graphql-request";
import { NextRequest } from "next/server";
import { GRAPHQL_URL } from "@/lib/env/url.variable";
import UpdateUserProfile from "@/graphql/user/mutation/updateUserProfile.mutation.graphql";
import { ICurrentUserBackendResponse } from "@/types/user/response/backend/currentUserBackend.response";
import { IUpdateProfileVariables } from "@/common/hooks/react-query/user/type/updateProfileVariables.interface";
import { IBackendErrorResponse } from "@/types/error-response/graphql-error/backendError.response";
import { IOriginalError } from "@/types/error-response/graphql-error/originalError.response";

export const POST = async (req: NextRequest): Promise<void> => {
  try {
    const token: string = await getAuthToken();
    
    const data: IUpdateProfileVariables = await req.json();
    
    const response: ICurrentUserBackendResponse = await request(GRAPHQL_URL, UpdateUserProfile, {
      input: {
        ...data,
      },
    }, {
      Authorization: `Bearer ${ token }`,
    });
    
    console.log(response);
    
  } catch (err: unknown) {
    if (err instanceof ClientError) {
      const backendError = err as unknown as IBackendErrorResponse;
      const originalError: IOriginalError = backendError.response.errors[0].extensions.originalError;
    }
  }
};