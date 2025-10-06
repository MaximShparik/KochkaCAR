import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminsController } from './admins.controller';
import { AdminsService } from './admins.service';
import { Admin, AdminSchema } from '../common/schemas/admin.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }])],
  controllers: [AdminsController],
  providers: [AdminsService],
})
export class AdminsModule {}
