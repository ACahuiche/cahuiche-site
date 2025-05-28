export interface UserDataAccess {
  email: string;
  password: string;
  name: string;
}

export type UserDataCredential = Omit<UserDataAccess , 'name'> 

