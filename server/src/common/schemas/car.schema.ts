// было
// import { Document } from 'mongoose';
// export class Car extends Document { ... }

// стало
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ConditionEnum } from '../enums/condition.enum';
import { LocationEnum } from '../enums/location.enum';

@Schema({ timestamps: true })
export class Car {
  @Prop({ required: true, trim: true })
  makeModel!: string;

  // @Prop({ required: true, trim: true })
  // model!: string; // ← теперь не конфликтует

  @Prop({ required: true })
  year!: number;

  @Prop({ required: true, unique: true, uppercase: true, trim: true })
  vin!: string;

  @Prop({ required: true, trim: true })
  invoiceNumber!: string;

  @Prop({ required: true, enum: Object.values(ConditionEnum) })
  condition!: ConditionEnum;

  @Prop({ required: true, enum: Object.values(LocationEnum) })
  location!: LocationEnum;

  // @Prop() lat?: number;
  // @Prop() lng?: number;
}

export type CarDocument = HydratedDocument<Car>;
export const CarSchema = SchemaFactory.createForClass(Car);
// CarSchema.index({ vin: 1 }, { unique: true });
