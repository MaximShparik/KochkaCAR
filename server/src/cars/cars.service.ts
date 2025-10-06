import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Car, CarDocument } from '../common/schemas/car.schema';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Injectable()
export class CarsService {
  constructor(@InjectModel(Car.name) private carModel: Model<CarDocument>) {}

  async findByVin(vin?: string): Promise<any> {
    if (!vin) throw new BadRequestException('vin is required');
    const car = await this.carModel.findOne({ vin: vin.toUpperCase() }).lean().exec();
    if (!car) throw new NotFoundException('Not found');
    return car;
  }

  async list(): Promise<any> {
    return this.carModel.find().sort({ updatedAt: -1 }).lean();
  }

  async create(dto: CreateCarDto) {
    try {
      return await this.carModel.create({ ...dto, vin: dto.vin.toUpperCase() });
    } catch (e: any) {
      if (e?.code === 11000) throw new ConflictException('VIN already exists');
      console.log(e)
      throw new BadRequestException('Invalid data');
    }
  }

  async update(id: string, dto: UpdateCarDto) {
    const update: any = { ...dto };
    if (update.vin) update.vin = String(update.vin).toUpperCase();
    const doc = await this.carModel.findByIdAndUpdate(id, update, { new: true });
    if (!doc) throw new NotFoundException('Not found');
    return doc;
  }

  async remove(id: string) {
    const doc = await this.carModel.findByIdAndDelete(id);
    if (!doc) throw new NotFoundException('Not found');
    return { ok: true };
  }
}
