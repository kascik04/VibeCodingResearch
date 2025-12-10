import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(req: any): Promise<{
        user: {
            id: number;
            email: string;
            name: string;
        };
        accessToken: string;
        tokenType: string;
        expiresIn: number;
    }>;
    getProfile(req: any): any;
}
