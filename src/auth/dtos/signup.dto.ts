import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class SignupDto {
  @IsNotEmpty()
  name: string;
  @IsEmail()
  email: string;
  @IsStrongPassword({
    minLowercase: 3,
    minNumbers: 1,
    minUppercase: 0,
    minSymbols: 1,
  })
  password: string;
}
