"use server";

import { NextRequest, NextResponse } from "next/server";
import { IUserBackendResponse } from "@/types/user/getUser.response";
import { getAuthToken, setAuthToken } from "@/utils/cookie/cookie.helper";

export async function GET(req: NextRequest) {
  try {
    const token: string = await getAuthToken();
    const backendUrl = `${ process.env.NEXT_PUBLIC_API_URL }/user/current-user`;
    
    const response = await fetch(backendUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ token }`,
      },
      credentials: "include",
    });
    
    if (!response.ok) {
      const text: string = await response.text().catch((): string => "");
      const message: string = text || `Backend error: ${ response.status }`;
      
      return NextResponse.json(
        {success: false, message},
        {status: response.status},
      );
    }
    
    const data: IUserBackendResponse = await response.json();
    
    await setAuthToken(data.token);
    
    return NextResponse.json({
      success: true,
      message: "User fetched successfully",
      user: {...data.user},
    });
  } catch (err) {
    console.error("Error fetching user:", err);
    return NextResponse.json(
      {success: false, message: "Internal server error"},
      {status: 500},
    );
  }
}
