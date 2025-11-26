import { VerifyAccessType } from "@/core/types/user/verifyAccess.type";

export interface IVerifyAccessBackendResponse {
  verifyAccess: {
    data: VerifyAccessType
  };
}