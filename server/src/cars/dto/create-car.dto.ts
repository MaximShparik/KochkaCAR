import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString, MaxLength, Min, IsInt } from 'class-validator';
import { ConditionEnum } from '../../common/enums/condition.enum';
import { LocationEnum } from '../../common/enums/location.enum';

export class CreateCarDto {
  @IsString()
  @MaxLength(80)
  makeModel!: string;

  // @IsString()
  // @MaxLength(80)
  // model!: string;

  @IsInt()
  @Min(1900)
  year!: number;

  @IsString()
  @MaxLength(32)
  @Transform(({ value }) => String(value).toUpperCase())
  vin!: string;

  @IsString()
  @MaxLength(64)
  invoiceNumber!: string;

  @IsEnum(ConditionEnum)
  condition!: ConditionEnum;

  @IsEnum(LocationEnum)
  location!: LocationEnum;

  // @IsOptional()
  // @IsNumber()
  // lat?: number;

  // @IsOptional()
  // @IsNumber()
  // lng?: number;
}
