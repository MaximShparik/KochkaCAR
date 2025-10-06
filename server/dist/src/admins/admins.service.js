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
exports.AdminsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const admin_schema_1 = require("../common/schemas/admin.schema");
const bcrypt = require("bcryptjs");
const crypto_1 = require("crypto");
const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789';
function generateRandomPassword(length = 12) {
    const bytes = (0, crypto_1.randomBytes)(length);
    let pass = '';
    for (let i = 0; i < length; i++)
        pass += ALPHABET[bytes[i] % ALPHABET.length];
    return pass;
}
let AdminsService = class AdminsService {
    constructor(adminModel) {
        this.adminModel = adminModel;
    }
    async create(username) {
        const exists = await this.adminModel.findOne({ username: username.toLowerCase() });
        if (exists)
            throw new common_1.ConflictException('username already exists');
        const plain = generateRandomPassword(12);
        const passwordHash = await bcrypt.hash(plain, 10);
        const doc = await this.adminModel.create({ username: username.toLowerCase(), passwordHash });
        return { username: doc.username, password: plain };
    }
};
exports.AdminsService = AdminsService;
exports.AdminsService = AdminsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(admin_schema_1.Admin.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AdminsService);
//# sourceMappingURL=admins.service.js.map