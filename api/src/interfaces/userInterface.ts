export interface UserInterface {
  id: string;
  email: string;
  password: string;
}

export type UserToCreate = Omit<UserInterface, 'id'>;

export interface UserCredentials {
  email: string;
  password: string;
}
