import { JwtPayload } from 'jwt-decode';

export type LoginState = 'idle' | 'logging' | 'logged' | 'error';

export type Payload = {
  id: string;
  role: string;
} & JwtPayload;

export type State = {
  loginState: LoginState;
  token: string | null;
  currentPayload: Payload | null;
  currenUser: unknown | null;
};
