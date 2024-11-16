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
  follower: string[];
  following: string[];
  address?: string;
  profilePhoto?: string;
  coverImg?: string;
  passwordChangedAt?: Date;
  about?: string;
  isDeleted?: boolean;
  createdAt?: string;
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

export type TUserLikeDislike = {
  _id: string;
  name: string;
  profilePhoto: string;
};

export type TPost = {
  _id?: string;
  title: string;
  content: string;
  user?: TUser;
  images: string[];
  category: "Tip" | "Story";
  contentType: "basic" | "premium";
  price?: number; // Price for premium posts
  comments: string[];
  like: TUserLikeDislike[]; // Updated type for likes
  disLike: TUserLikeDislike[]; // Updated type for dislikes
  isPublished?: boolean;
  isUnlockedBy: string[];
  createdAt?: string;
};

export type TUpdateUser = {
  name?: string;
  about?: string;
  mobileNumber?: string;
  address?: string;
  profilePhoto?: string;
  coverImg?: string;
};

export type TUnlockPost = {
  _id?: string;
  userId: TUser;
  postId: TPost;
  amount: number;
  paymentStatus: "Pending" | "Paid" | "Failed";
  transactionId: string;
  createdAt?: string;
};
export type TVerifiedUser = {
  _id?: string;
  userId: TUser;
  amount: number;
  paymentStatus: "Pending" | "Paid" | "Failed";
  transactionId: string;
  createdAt?: string;
};

export type TLike = {
  _id?: string;
  user: TUser;
  post: TPost;
  upvotes?: number;
  downvotes?: number;
};

export type TComment = {
  _id?: string;
  post: TPost;
  user?: TUser;
  content: string;
  createdAt?: string;
};

export type TCommentResponse = {
  _id?: string;
  post: string;
  content: string;
};

export type TUpdateComment = {
  commentId: string;
  content: string;
};

export type TUpdateUserRole = {
  userId: string;
  role: string;
};

interface Option {
  label: string;
  value: string;
}

export const categoryOptions: Option[] = [
  { label: "All Posts", value: "All Post" },
  { label: "Tip", value: "Tip" },
  { label: "Story", value: "Story" },
];
export const contentTypeOptions: Option[] = [
  { label: "All Content", value: "All Content" },
  { label: "Basic", value: "basic" },
  { label: "Premium", value: "premium" },
];
