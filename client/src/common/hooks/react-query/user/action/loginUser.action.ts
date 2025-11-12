"use client";

import { IApiError } from "@/types/error/api-error/response/apiError.response";
import { IUserApiResponse } from "@/types/user/response/api/userApi.response";
import axios, { AxiosResponse } from "axios";

export const loginUser = async (username: string, password: string): Promise<IUserApiResponse> => {
  try {
    const response: AxiosResponse<IUserApiResponse> = await axios.post("/api/user/login", {
      username,
      password,
    });
    
    return response.data as IUserApiResponse;
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response?.data) {
      const errorResponse = err.response.data as IApiError;
      
      throw new Error(errorResponse.message ?? "Something went wrong");
    }
    
    throw new Error("Something went wrong");
  }
};