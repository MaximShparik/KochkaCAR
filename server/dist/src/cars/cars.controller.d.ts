import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
export declare class CarsController {
    private readonly cars;
    constructor(cars: CarsService);
    findPublic(vin: string): Promise<any>;
    list(): Promise<any>;
    create(dto: CreateCarDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../common/schemas/car.schema").Car, {}, {}> & import("../common/schemas/car.schema").Car & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("../common/schemas/car.schema").Car, {}, {}> & import("../common/schemas/car.schema").Car & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    update(id: string, dto: UpdateCarDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../common/schemas/car.schema").Car, {}, {}> & import("../common/schemas/car.schema").Car & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("../common/schemas/car.schema").Car, {}, {}> & import("../common/schemas/car.schema").Car & {
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
