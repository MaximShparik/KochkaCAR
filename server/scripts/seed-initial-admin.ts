import 'dotenv/config';
import mongoose from 'mongoose';
import { Admin, AdminSchema } from '../src/common/schemas/admin.schema';
import * as bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';

const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789';

function generateRandomPassword(length = 12) {
  const bytes = randomBytes(length);
  let pass = '';
  for (let i = 0; i < length; i++) pass += ALPHABET[bytes[i] % ALPHABET.length];
  return pass;
}

(async () => {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/cartracker';
  await mongoose.connect(uri);

  const AdminModel = mongoose.model<Admin>('Admin', AdminSchema);
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
