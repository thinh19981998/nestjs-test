import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private readonly jwtservice: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async sendUserConfirmation(email: string) {
    const payload = { email };
    const token = this.jwtservice.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
    });
    const url = `http://localhost:3000/auth/verify?token=${token}`;
    await this.mailerService.sendMail({
      to: email,
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './confirmation',
      context: { url, name: 'New User' },
    });
  }
}
