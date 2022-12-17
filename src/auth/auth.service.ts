import { BadRequestException, forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { MailService } from 'src/mail/mail.service';
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async validateUser(username: string): Promise<User | any | undefined> {
    try{
      const user = await this.usersService.findUser(username);

      if (user) {
        const { password, ...result } = user;
        return result;
      }
      return null;
    }catch(error){
      return error;
    }
  }

  async login(user: any) {
    try{
      const currentUser = await this.usersService.findUser(user.user_name);

      if(currentUser){
        const isMatch = await this.checkPassword(currentUser.password, user.password);
        if(isMatch){
          if(currentUser.is_verified === true){
            delete currentUser.password;
            delete currentUser.is_verified;
            delete currentUser.is_blocked;
            delete currentUser.created_at;
            delete currentUser.updated_at;
            delete currentUser.deleted_at;

            return {
              user: currentUser,
              access_token: this.jwtService.sign(user),
            }
          }else{
            throw new BadRequestException('Please verify your email');
          }
        }else{
          throw new BadRequestException('Invalid password');
        }
      }else{
        throw new HttpException('User not found', HttpStatus.OK);
      }
    }catch(e){
      return e;
    }
  }

  async checkPassword(userPassword: string, plainPassword: string): Promise<boolean> {
    return compareSync(plainPassword, userPassword);
  }

  async register(user: any){
    return await this.usersService.registerUser(user, undefined).then(async (res) => {
      await this.mailService.sendUserConfirmation(user);
      return res;
    }).catch(e => {
      return e;
    })
  }

}