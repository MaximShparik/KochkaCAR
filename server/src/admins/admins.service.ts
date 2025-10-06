import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin } from '../common/schemas/admin.schema';
import * as bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';
// const bytes = randomBytes(length);

const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789';

function generateRandomPassword(length = 12) {
  const bytes = randomBytes(length);
  let pass = '';
  for (let i = 0; i < length; i++) pass += ALPHABET[bytes[i] % ALPHABET.length];
  return pass;
}

@Injectable()
export class AdminsService {
  constructor(@InjectModel(Admin.name) private adminModel: Model<Admin>) {}

  async create(username: string) {
    const exists = await this.adminModel.findOne({ username: username.toLowerCase() });
    if (exists) throw new ConflictException('username already exists');
    const plain = generateRandomPassword(12);
    const passwordHash = await bcrypt.hash(plain, 10);
    const doc = await this.adminModel.create({ username: username.toLowerCase(), passwordHash });
    return { username: doc.username, password: plain };
  }
}
