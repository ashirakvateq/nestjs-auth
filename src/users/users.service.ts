import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

// This should be a real class/interface representing a user entity
export type user = any;

@Injectable()
export class UsersService {

  private salts: number = 10;
  private pass = null;

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ){}

  async findUser(username: string, password: string): Promise<User | any | undefined> {
    // const hashPassword = await bcrypt.hash(password, this.salts);
    const user = await this.userRepository.findOne({where: { user_name: username }});

    if(user){
      this.pass = user.password;
      const isMatch = await this.checkPassword(password, this.pass);
      if(isMatch){
        delete user.password;
        delete user.created_at;
        delete user.updated_at;
        delete user.deleted_at;
        return user;
      }else{
        return null;
      }
    }
  }

  async checkPassword(userPassword: string, plainPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, userPassword);
  }

}