export type User = {
  id: number;
  username: string;
  email: string;
  first_languages: Language[];
  second_languages: Language[];
  community_tags: CommunityTag[];
  answer_filter: number;
  access_token: string;
};

export type Language = {
  id: number;
  language: string;
};

export type CommunityTag = {
  id: number;
  community_tag: string;
};

export type LoginRequest = {
  email: User['email'];
  password: string;
};
export type LoginResponse = {
  user: User;
};

export type LogoutRequest = void;
export type LogoutResponse = void;

export type GetLoginUserRequest = void;
export type GetLoginUserResponse = LoginResponse;

export type RegisterRequest = Omit<
  User,
  'id' | 'access_token' | 'answer_filter'
> & { password: string };
export type RegisterResponse = LoginResponse;

export type EditUserRequest = Partial<Omit<User, 'id' | 'access_token'>>;
export type EditUserResponse = LoginResponse;
