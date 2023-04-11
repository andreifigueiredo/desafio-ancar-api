import { Injectable, Inject } from '@nestjs/common';
import { User } from './user.entity';
import { UserCreateDto } from './dto/userCreate.dto';
import { USER_REPOSITORY } from '../../core/constants';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {}

  cleanCpf(cpf: string): string {
    const numbersOnly = cpf.replace(/\D/g, '');

    return numbersOnly;
  }

  async findAll(page = 1, limit = 10): Promise<User[]> {
    const offset = (page - 1) * limit;

    return await this.userRepository.findAll<User>({
      attributes: { exclude: ['password'] },
      offset,
      limit,
    });
  }

  async create(user: UserCreateDto): Promise<User> {
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
