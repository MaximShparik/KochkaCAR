import { Model } from 'mongoose';
import { Admin } from '../common/schemas/admin.schema';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private adminModel;
    private jwt;
    constructor(adminModel: Model<Admin>, jwt: JwtService);
    validate(username: string, password: string): Promise<{
        token: string;
        username: string;
    }>;
}
