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
