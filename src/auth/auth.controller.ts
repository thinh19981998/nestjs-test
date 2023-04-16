import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { MailService } from 'src/mail/mail.service';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/registerDto';
import { LocalAuthGuard } from './local-auth.guard';
import RequestWithUser from './requestWithUser.interface';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mailService: MailService,
  ) {}

  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    const user = await this.authService.register(registrationData);
    await this.mailService.sendUserConfirmation(registrationData.email);
    return user;
  }

  @Get('/verify')
  async verify(@Query() query: any) {
    const { token } = query;
    const email = await this.authService.decodeConfirmationToken(token);
    await this.authService.confirmEmail(email);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() request: RequestWithUser) {
    const { user } = request;
    const cookie = this.authService.getCookieWithJwtToken(user.id);
    // response.setHeader('Set-Cookie', cookie);
    // user.password = undefined;
    request.res.setHeader('Set-Cookie', cookie);
    return user;
  }
}
