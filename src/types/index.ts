export const USER_Role = {
  admin: "admin",
  user: "user",
} as const;

export const USER_STATUS = {
  basic: "basic",
  premium: "premium",
} as const;

export type TUser = {
  _id?: string;
  name: string;
  username?: string;
  email: string;
  password: string;
  mobileNumber: string;
  gender: "Male" | "Female" | "Other";
  role: keyof typeof USER_Role;
  status: keyof typeof USER_STATUS;
  address?: string;
  profilePhoto?: string;
  coverImg?: string;
  passwordChangedAt?: Date;
  about?: string;
  isDeleted?: boolean;
};

export type IUser = {
  _id?: string;
  name: string;
  username: string;
  email: string;
  role: keyof typeof USER_Role;
  status: keyof typeof USER_STATUS;
  profilePhoto: string;
};
