import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  NotFoundException,
  UseGuards,
  Request,
  Patch,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { User as UserEntity } from '../users/user.entity';
import { UserDto, UserUpdateDto } from './dto/user.dto';

const doesNotExistMessage = "This User doesn't exist";

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<UserEntity> {
    const user = await this.userService.findOne(id);

    if (!user) {
      throw new NotFoundException(doesNotExistMessage);
    }

    return user;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(
    @Body() user: UserDto,
    // @Request() req
  ): Promise<UserEntity> {
    return await this.userService.create(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() user: UserUpdateDto,
    // @Request() req,
  ): Promise<UserEntity> {
    // if (id != req.user.id) {
    //   throw new NotFoundException("You can't update other user");
    // }

    const { numberOfAffectedRows, updatedUser } = await this.userService.update(
      id,
      user,
    );

    if (numberOfAffectedRows === 0) {
      throw new NotFoundException(doesNotExistMessage);
    }

    return updatedUser;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(
    @Param('id') id: number,
    // @Request() req
  ) {
    // if (id != req.user.id) {
    //   throw new NotFoundException("You can't delete other user");
    // }

    const deleted = await this.userService.delete(id);

    if (deleted === 0) {
      throw new NotFoundException(doesNotExistMessage);
    }

    return 'Successfully deleted';
  }
}
