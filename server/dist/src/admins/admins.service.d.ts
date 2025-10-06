import { Model } from 'mongoose';
import { Admin } from '../common/schemas/admin.schema';
export declare class AdminsService {
    private adminModel;
    constructor(adminModel: Model<Admin>);
    create(username: string): Promise<{
        username: string;
        password: string;
    }>;
}
