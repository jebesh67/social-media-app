"use client";

import { IApiError } from "@/types/error-response/api-error/apiError.response";
import { IUserApiResponse } from "@/types/user/response/api/userApi.response";
import axios, { AxiosResponse } from "axios";

export const loginUser = async (username: string, password: string): Promise<IUserApiResponse | IApiError> => {
  try {
    const response: AxiosResponse<IUserApiResponse | IApiError> = await axios.post("/api/user/login", {
      username,
      password,
    });
    
    return response.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response?.data) {
      const backendData = err.response.data as IApiError;
      
      return {
        success: backendData.success ?? false,
        message: backendData.message ?? "Something went wrong",
        statusCode: backendData.statusCode ?? 500,
      };
    }
    
    return {
      success: false,
      message: "Oops something went wrong!",
      statusCode: 500,
    };
  }
};