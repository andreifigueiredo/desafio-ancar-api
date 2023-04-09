import { Injectable, Inject } from '@nestjs/common';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import { USER_REPOSITORY } from '../../core/constants';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll<User>({
      attributes: { exclude: ['password'] },
    });
  }

  async create(user: UserDto): Promise<User> {
    return await this.userRepository.create<User>(user);
  }

  async findOneByCpf(cpf: string): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { cpf } });
  }

  async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { id } });
  }

  async findOne(id): Promise<User> {
    return await this.userRepository.findOne({
      where: { id },
      attributes: { exclude: ['password'] },
    });
  }

  async delete(id) {
    return await this.userRepository.destroy({ where: { id } });
  }

  async update(id, data) {
    const [numberOfAffectedRows, [updatedUser]] =
      await this.userRepository.update(
        { ...data },
        {
          where: { id },
          returning: true,
        },
      );

    return { numberOfAffectedRows, updatedUser };
  }
}
