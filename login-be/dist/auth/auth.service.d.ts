import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(identifier: string, pass: string): Promise<User | null>;
    login(user: User): Promise<{
        user: {
            id: number;
            email: string;
            name: string;
        };
        accessToken: string;
        tokenType: string;
        expiresIn: number;
    }>;
}
