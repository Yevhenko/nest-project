export interface IUser {
  id?: number;
  username: string;
  password: string;
  isActive: boolean;
  sessionID?: string;
}
