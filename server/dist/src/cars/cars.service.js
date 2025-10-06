"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const car_schema_1 = require("../common/schemas/car.schema");
let CarsService = class CarsService {
    constructor(carModel) {
        this.carModel = carModel;
    }
    async findByVin(vin) {
        if (!vin)
            throw new common_1.BadRequestException('vin is required');
        const car = await this.carModel.findOne({ vin: vin.toUpperCase() }).lean().exec();
        if (!car)
            throw new common_1.NotFoundException('Not found');
        return car;
    }
    async list() {
        return this.carModel.find().sort({ updatedAt: -1 }).lean();
    }
    async create(dto) {
        try {
            return await this.carModel.create({ ...dto, vin: dto.vin.toUpperCase() });
        }
        catch (e) {
            if ((e === null || e === void 0 ? void 0 : e.code) === 11000)
                throw new common_1.ConflictException('VIN already exists');
            console.log(e);
            throw new common_1.BadRequestException('Invalid data');
        }
    }
    async update(id, dto) {
        const update = { ...dto };
        if (update.vin)
            update.vin = String(update.vin).toUpperCase();
        const doc = await this.carModel.findByIdAndUpdate(id, update, { new: true });
        if (!doc)
            throw new common_1.NotFoundException('Not found');
        return doc;
    }
    async remove(id) {
        const doc = await this.carModel.findByIdAndDelete(id);
        if (!doc)
            throw new common_1.NotFoundException('Not found');
        return { ok: true };
    }
};
exports.CarsService = CarsService;
exports.CarsService = CarsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(car_schema_1.Car.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CarsService);
//# sourceMappingURL=cars.service.js.map