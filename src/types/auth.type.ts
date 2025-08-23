export interface IRegisterRequest {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  nidNumber: string;
  role?: string;
  wallet?: string; //user
  isActive?: string; //for user set admin
  isVerified?: boolean; //email or phone otp verification
  isApproved?: string; //for agent set admin
  commissionRate?: number; //for agent set admin
  isDeleted?: boolean;
}

export interface IRegisterResponse {
  name: string;
  email: string;
  phone: string;
  password: string;
  nidNumber: string;
  role: string;
  wallet: string; //user
  isActive: string; //for user set admin
  isVerified: boolean; //email or phone otp verification
  isApproved: string; //for agent set admin
  commissionRate: number; //for agent set admin
  isDeleted: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface ISendOTPRequest {
  email: string;
}

export interface IVerifyOTPRequest {
  email: string;
  otp: string;
};

export interface ILoginRequest {
  phone: string;
  password: string;
};

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    name: string;
    email: string;
    phone: string;
    password: string;
    nidNumber: string;
    role: string;
    wallet: string; //user
    isActive: string; //for user set admin
    isVerified: boolean; //email or phone otp verification
    isApproved: string; //for agent set admin
    commissionRate: number; //for agent set admin
    isDeleted: boolean;
    _id: string;
    createdAt: string;
    updatedAt: string;
  };
}
