import { Body, Controller, Headers, Post, Request } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.body);
  }

  @Post('/register')
  async register(@Body() userData: User){
    return this.authService.register(userData);
  }
}
