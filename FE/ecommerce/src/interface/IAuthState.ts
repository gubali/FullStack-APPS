import type { IUser } from "./ILoginResponse";
export interface AuthState {
  isLoggedIn: boolean;
  user: IUser | null;
  error: string | null;
}
