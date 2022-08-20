import { Body, Controller, Headers, Post, Request } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Request() req, @Headers('Authorization') token: string) {
    return this.authService.login(req.body, token);
  }

  @Post('/register')
  async register(@Body() userData: User, @Headers('Authorization') token: string){
    return this.authService.register(userData, token);
  }
}
