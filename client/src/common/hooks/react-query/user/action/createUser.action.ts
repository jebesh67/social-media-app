"use client";

import { IApiError } from "@/types/error/api-error/response/apiError.response";
import { IUserApiResponse } from "@/types/user/response/api/userApi.response";
import axios, { AxiosResponse } from "axios";
import { CustomError } from "@/common/helper/error/customError.helper";

export const createUser = async (name: string, username: string, email: string, password: string): Promise<IUserApiResponse> => {
  try {
    const response: AxiosResponse<IUserApiResponse> = await axios.post("/api/user/create-user", {
      name,
      username,
      email,
      password,
    });
    
    return response.data as IUserApiResponse;
    
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response?.data) {
      const errorResponse = err.response.data as IApiError;
      throw new CustomError(errorResponse);
    }
    
    throw new CustomError({
      message:
        err instanceof Error ?
          err.message : "Error creating user!",
    });
  }
};