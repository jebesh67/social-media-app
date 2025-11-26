import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAuthToken } from "@/core/utils/cookie/cookie.helper";
import { PUBLIC_PATHS } from "@/core/proxy/data/publicPaths.data";
import { IVerifyAccessBackendResponse } from "@/core/types/user/response/backend/verifyAccessBackend.response";
import { request } from "graphql-request";
import { GRAPHQL_URL } from "@/lib/env/url.variable";
import VerifyAccessQuery from "@/graphql/user/query/verifyAccess.query.graphql";

export const proxy = async (req: NextRequest): Promise<NextResponse> => {
  const {pathname} = req.nextUrl;
  
  if (PUBLIC_PATHS.some((path: string): boolean => pathname.startsWith(path))) {
    return NextResponse.next();
  }
  
  const token: string = await getAuthToken();
  
  if (token) {
    const response: IVerifyAccessBackendResponse = await request(GRAPHQL_URL, VerifyAccessQuery, {}, {
      Authorization: `Bearer ${ token }`,
    });
    
    if (!response.verifyAccess.data.accessGranted)
      return NextResponse.redirect(new URL("/auth", req.url));
    
    return NextResponse.next();
  } else {
    return NextResponse.redirect(new URL("/auth", req.url));
  }
};

export const config = {
  matcher: ["/((?!_next/static|favicon.ico).*)"],
};
