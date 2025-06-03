export interface UserDataAccess {
  email: string;
  password: string;
  name: string;
  isAdmin: boolean;
}

export type UserDataCredential = Omit<UserDataAccess , 'name' | 'isAdmin'> 

