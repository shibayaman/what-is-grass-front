export type User = {
  id: number;
  username: string;
  email: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};
export type LoginResponse = User & { access_token: string };

export type LogoutRequest = void;
export type LogoutResponse = void;

export type GetLoginUserRequest = void;
export type GetLoginUserResponse = User;

export type RegisterRequest = {
  username: string;
  email: string;
  password: string;
};
export type RegisterResponse = LoginResponse;
