import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  NotFoundException,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User as UserEntity } from '../users/user.entity';
import { UserCreateDto } from './dto/userCreate.dto';
import { UserUpdateDto } from './dto/userUpdate.dto';

const doesNotExistMessage = "This User doesn't exist";

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<UserEntity> {
    const user = await this.userService.findOne(id);

    if (!user) {
      throw new NotFoundException(doesNotExistMessage);
    }

    return user;
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post()
  async create(@Body() user: UserCreateDto): Promise<UserEntity> {
    return await this.userService.create(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
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
  @ApiBearerAuth()
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
