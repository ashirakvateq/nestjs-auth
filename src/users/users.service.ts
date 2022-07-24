import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash, hashSync } from 'bcrypt';
import { CreateUser } from 'src/enums/all.enum';
import { InsertResult, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  private salts: number = 10;

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ){}

  async create(user: CreateUser): Promise<InsertResult> {
    user.first_name = user.first_name;
    user.last_name = user.last_name;
    user.user_name = user.user_name;
    user.email = user.email;
    user.password = hashSync(user.password, this.salts);
    return await this.userRepository.insert([user]);
  }

  async findOne(username: string, pass: string): Promise<User> {
    // const pass = bcrypt.compare(pass,hash)
    return await this.userRepository.findOne({ where: { user_name: username} });
  }

  findAll() {
    return `This action returns all users`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
