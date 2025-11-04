import { VerifyAccessType } from "@/types/user/verifyAccess.type";

export interface IVerifyAccessBackendResponse {
  verifyAccess: {
    data: VerifyAccessType
  };
}