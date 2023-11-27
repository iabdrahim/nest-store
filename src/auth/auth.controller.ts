import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth';
import { LoginDto } from './dtos/login.dto';
import { SignupDto } from './dtos/signup.dto';
import connectDB from 'utils/database';
import { Request } from 'express';
import { ThrottlerGuard } from '@nestjs/throttler';

@UseGuards(ThrottlerGuard)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  async signin(@Body() userdata: LoginDto) {
    await connectDB();
    let token = await this.authService.login(userdata);
    return { token };
  }
  @Post('register')
  async signup(@Body() userdata: SignupDto) {
    await connectDB();
    let token = await this.authService.createUser(userdata);
    return { token };
  }
  @Get('me')
  async getCurrent(@Req() req: Request) {
    await connectDB();
    let token = req.headers.authorization.split(' ')[1];
    let user = await this.authService.getCurrentUserFromToken(token);
    return user;
  }
  @Put('me')
  async updateCurrent(@Req() req: Request, @Body() userdata: {}) {
    await connectDB();
    let token = req.headers.authorization.split(' ')[1];
    let msg = await this.authService.updateProfile(token, userdata);
    return msg;
  }
  @Delete('me')
  async removeCurrent(@Req() req: Request, @Body() userdata: {}) {
    await connectDB();
    let token = req.headers.authorization.split(' ')[1];
    let msg = await this.authService.deleteProfile(token);
    return msg;
  }
}
