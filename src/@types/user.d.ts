export interface UserForm {
  email: string;
  password: string;
}

export interface UserState {
  pseudo: string | null;
  token: strings | null;
  logged: boolean;
}
