export type UserStatus = 'ACTIVE' | 'LOCKED';
export declare class User {
    id: number;
    email: string;
    username: string;
    name: string;
    passwordHash: string;
    status: UserStatus;
}
