import { Model } from 'mongoose';
import { Car, CarDocument } from '../common/schemas/car.schema';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
export declare class CarsService {
    private carModel;
    constructor(carModel: Model<CarDocument>);
    findByVin(vin?: string): Promise<any>;
    list(): Promise<any>;
    create(dto: CreateCarDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Car, {}, {}> & Car & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, Car, {}, {}> & Car & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    update(id: string, dto: UpdateCarDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Car, {}, {}> & Car & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, Car, {}, {}> & Car & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    remove(id: string): Promise<{
        ok: boolean;
    }>;
}
