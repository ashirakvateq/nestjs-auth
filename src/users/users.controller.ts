import { Controller, Get, Post, Body, Param, Delete, UseGuards, Put, Headers } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('email-verify/:id')
  async EmailVerify(@Param('id') id: string, @Headers('Authorization') token: string) {
      return this.usersService.EmailVerify(+id, token);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile/:id')
  async getProfile(@Param('id') id: string, @Headers('Authorization') token: string) {
    return this.usersService.getProfile(+id, token) ;
  }

}
