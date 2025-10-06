import { HydratedDocument } from 'mongoose';
import { ConditionEnum } from '../enums/condition.enum';
import { LocationEnum } from '../enums/location.enum';
export declare class Car {
    makeModel: string;
    year: number;
    vin: string;
    invoiceNumber: string;
    condition: ConditionEnum;
    location: LocationEnum;
}
export type CarDocument = HydratedDocument<Car>;
export declare const CarSchema: import("mongoose").Schema<Car, import("mongoose").Model<Car, any, any, any, import("mongoose").Document<unknown, any, Car, any, {}> & Car & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Car, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Car>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Car> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
