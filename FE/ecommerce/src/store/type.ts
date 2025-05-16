interface AuthState {
  user: { userName: string; role: string } | null;
  isLoggedIn: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface RootState {
  auth: AuthState;
}
