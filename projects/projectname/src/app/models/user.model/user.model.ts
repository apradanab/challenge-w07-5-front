export type UserLoginDto = {
  username: 'string';
  password: 'string';
};

export type UserRegisterDto = {
  name: string | null;
  email: string | null;
  password: string | null;
};
