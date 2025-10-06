import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';
export declare class AdminsController {
    private readonly admins;
    constructor(admins: AdminsService);
    create(dto: CreateAdminDto): Promise<{
        username: string;
        password: string;
    }>;
}
