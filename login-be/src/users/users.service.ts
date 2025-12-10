import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  // Mock user – bạn có thể thay bằng DB sau
  private users: User[] = [];

  constructor() {
    const password = 'Password123!';
    const passwordHash = bcrypt.hashSync(password, 10);

    this.users.push({
      id: 1,
      email: 'test@vibecoding.com',
      username: 'testuser',
      name: 'Test User',
      passwordHash,
      status: 'ACTIVE',
    });
  }

  async findByIdentifier(identifier: string): Promise<User | undefined> {
    return this.users.find(
      (u) => u.email === identifier || u.username === identifier,
    );
  }
}