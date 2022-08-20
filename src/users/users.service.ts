import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { hashSync } from 'bcrypt';
import { CreateUser } from 'utils/all.DTO';

@Injectable()
export class UsersService {

  private salts: number = 10;

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ){}

  async EmailVerify(userId: number, token: string){
    try{
      const user = await this.userRepository.findOne({ where: {id:userId} });

      if(user){
        user.is_verified = true;
        const VerifiedUser = await this.userRepository.update(user.id, user);
        return true;
      }else{
        throw new BadRequestException('Invalid user');
      }
    }catch(e){
      return e;
    }
  }

  async registerUser(user: CreateUser, token: string): Promise<InsertResult>{
      const UserAlreadyExist = await this.userRepository.findOne({ where: { email : user.email } });
      
      if(UserAlreadyExist){
        throw new BadRequestException('User already registered on this email');
      }

      const user_name_exist = await this.userRepository.findOne({ where: { user_name : user.user_name } });
      
      if(user_name_exist){
        throw new BadRequestException('Username is not available');
      }

      user.is_verified = false;
      user.role = user.role;
      user.is_blocked = false;
      user.password = hashSync(user.password, this.salts);

      return await this.userRepository.insert([user]).then((res) => {
          return res;
      }).catch(e => {
        return e;
      })
  }

  async findUser(username: string): Promise<User> {
    const user = await this.userRepository.findOne({where: { user_name: username }, relations: ['role']})
    return user;
  }

  async getProfile(userId: number, token: string): Promise<any>{

      return await this.userRepository.findOne({where: { id: userId }}).then((res) => {
        if(res){
          delete res.is_verified;
          delete res.is_blocked;
          delete res.password;
          delete res.created_at;
          delete res.updated_at;
          delete res.deleted_at;
          return res;
        }
        else{
          throw new BadRequestException('Invalid user');
        }
      }).catch(e => {
        return e;
      })

  }

}
