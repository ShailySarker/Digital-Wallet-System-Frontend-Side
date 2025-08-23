export interface IRegisterRequest {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  nidNumber: string;
  role: string;
  wallet?: string; //user
  isActive?: string; //for user set admin
  isVerified?: boolean; //email or phone otp verification
  isApproved?: string; //for agent set admin
  commissionRate?: number; //for agent set admin
  isDeleted?: boolean;
}
