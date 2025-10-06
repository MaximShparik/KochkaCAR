"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const mongoose_1 = require("mongoose");
const admin_schema_1 = require("../src/common/schemas/admin.schema");
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
(async () => {
    const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/cartracker';
    await mongoose_1.default.connect(uri);
    const AdminModel = mongoose_1.default.model('Admin', admin_schema_1.AdminSchema);
    const existing = await AdminModel.findOne({ username: 'admin' });
    if (existing) {
        console.log('Admin already exists: admin');
        process.exit(0);
    }
    const password = generateRandomPassword(12);
    const passwordHash = await bcrypt.hash(password, 10);
    await AdminModel.create({ username: 'admin', passwordHash });
    console.log('Admin created:');
    console.log('  username: admin');
    console.log('  password:', password);
    process.exit(0);
})().catch((e) => {
    console.error(e);
    process.exit(1);
});
//# sourceMappingURL=seed-initial-admin.js.map