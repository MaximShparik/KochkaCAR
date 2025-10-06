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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarSchema = exports.Car = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const condition_enum_1 = require("../enums/condition.enum");
const location_enum_1 = require("../enums/location.enum");
let Car = class Car {
};
exports.Car = Car;
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], Car.prototype, "makeModel", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Car.prototype, "year", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true, uppercase: true, trim: true }),
    __metadata("design:type", String)
], Car.prototype, "vin", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], Car.prototype, "invoiceNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: Object.values(condition_enum_1.ConditionEnum) }),
    __metadata("design:type", String)
], Car.prototype, "condition", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: Object.values(location_enum_1.LocationEnum) }),
    __metadata("design:type", String)
], Car.prototype, "location", void 0);
exports.Car = Car = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Car);
exports.CarSchema = mongoose_1.SchemaFactory.createForClass(Car);
//# sourceMappingURL=car.schema.js.map