import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: User) {
    const url = 'http://localhost:3000/users/email-verify/'+user.id;

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to Nest Auth App! Confirm your Email',
      template: './confirmation',
      context: { 
        name: user.user_name,
        url,
      },
    });
  }

}