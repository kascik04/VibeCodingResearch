import { User } from './entities/user.entity';
export declare class UsersService {
    private users;
    constructor();
    findByIdentifier(identifier: string): Promise<User | undefined>;
}
