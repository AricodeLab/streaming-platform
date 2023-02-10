import { Repository,FindOneOptions  } from 'typeorm';
import { User } from './entity';

export class UserRepository extends Repository<User> {
  async findByEmail(email: string): Promise<User | undefined> {
    const options: FindOneOptions<User> = { where: { email } };
    return this.findOne(options);
  }
}