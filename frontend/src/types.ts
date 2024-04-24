export type User = {
  email: string;
  password: string;
};

export interface IPost {
  id?: string;
  content: string;
  user: {
    id: number;
    };

}
export type NewUser = User & {
  fullname: string;
};

export type UserBasicInfo = {
  id: number;
  fullname: string;
  email: string;
  access_token: string;
};

export type AuthApiState = {
  basicUserInfo?: UserBasicInfo | null;
  userProfileData?: UserProfileData | null;
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
};

export type UserProfileData = {
  fullname: string;
  email: string;
};