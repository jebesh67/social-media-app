"use client";

import { IApiError } from "@/core/types/error/api-error/response/apiError.response";
import { IUserApiResponse } from "@/core/types/user/response/api/userApi.response";
import axios, { AxiosResponse } from "axios";
import { CustomError } from "@/core/helper/error/customError.helper";
import { ICreateUserVariables } from "@/core/hooks/react-query/user/type/createUserVariables.interface";

export const createUserAction = async ({
  name,
  username,
  email,
  password,
  confirmPassword,
}: ICreateUserVariables): Promise<IUserApiResponse> => {
  try {
    const response: AxiosResponse<IUserApiResponse> = await axios.post("/api/user/create-user", {
      name,
      username,
      email,
      password,
      confirmPassword,
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