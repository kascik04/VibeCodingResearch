export type UserStatus = 'ACTIVE' | 'LOCKED';

export class User {
  id: number;
  email: string;
  username: string;
  name: string;
  passwordHash: string;
  status: UserStatus;
}