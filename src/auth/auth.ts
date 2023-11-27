import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import Profile from './user.model';
import * as jwt from 'jsonwebtoken';
import { hash, compare } from 'bcrypt';
import { isStrongPassword } from 'class-validator';

@Injectable()
export class AuthService {
  async login(userdata: { password: string; email: string }): Promise<string> {
    //get user by email
    let user = await Profile.findOne({ email: userdata.email });
    if (!user) {
      throw new HttpException(
        'no user found with this email',
        HttpStatus.NOT_FOUND,
      );
    }
    let samePass = await compare(userdata.password, user.password);
    if (!samePass) {
      throw new HttpException(
        'This password is incorrect',
        HttpStatus.BAD_REQUEST,
      );
    }
    let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    return token;
  }
  async createUser(userdata: {
    name: string;
    email: string;
    password: string;
  }): Promise<string> {
    let olduser: any = await Profile.findOne({ email: userdata.email });
    if (olduser) {
      throw new HttpException(
        'This email is aleardy used please login',
        HttpStatus.BAD_REQUEST,
      );
    }
    let passwordEncrypted = await hash(userdata.password, 2);
    let user = await Profile.create({
      password: passwordEncrypted,
      name: userdata.name,
      email: userdata.email,
    });
    let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    return token;
  }
  async getCurrentUserFromToken(token: string) {
    let { id } = jwt.decode(token) as { id: string };
    let user = await Profile.findById(id);
    if (!user) {
      throw new HttpException('no user found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async updateProfile(token: string, userdata: any) {
    let { id } = jwt.decode(token) as { id: string };
    if (userdata.password) {
      if (
        !isStrongPassword(userdata.password, {
          minLowercase: 3,
          minNumbers: 1,
          minUppercase: 0,
          minSymbols: 1,
        })
      )
        throw new HttpException(
          'This password is not strong',
          HttpStatus.BAD_REQUEST,
        );
      userdata.password = await hash(userdata.password, 2);
    }
    await Profile.findByIdAndUpdate(id, { $set: userdata });
    return 'Done';
  }
  async deleteProfile(token: string) {
    let { id } = jwt.decode(token) as { id: string };
    await Profile.findByIdAndDelete(id);
    return 'Done';
  }
}
