import { ConditionEnum } from '../../common/enums/condition.enum';
import { LocationEnum } from '../../common/enums/location.enum';
export declare class CreateCarDto {
    makeModel: string;
    year: number;
    vin: string;
    invoiceNumber: string;
    condition: ConditionEnum;
    location: LocationEnum;
}
