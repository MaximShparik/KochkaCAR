import { IsString, Matches } from 'class-validator';

export class CreateAdminDto {
  @IsString()
  @Matches(/^[a-zA-Z0-9_.-]{3,32}$/)
  username!: string;
}
