import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { decode } from 'jsonwebtoken';
import { isValidObjectId } from 'mongoose';

let JWT_SECRET = process.env.JWT_SECRET;

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    let tokenEncrypted = req.headers.authorization;
    if (!tokenEncrypted || !tokenEncrypted.split(' ')[1]) {
      throw new HttpException(
        'your are not authenticated',
        HttpStatus.FORBIDDEN,
      );
    }
    tokenEncrypted = tokenEncrypted.split(' ')[1];
    let data = decode(tokenEncrypted) as { id: string };
    if (!data || !isValidObjectId(data.id)) {
      throw new HttpException(
        'your are not authenticated',
        HttpStatus.FORBIDDEN,
      );
    }
    next();
  }
}
