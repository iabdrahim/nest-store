import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOneProduct {
  @IsNotEmpty()
  name: string;
  @IsNumber()
  price: string;
  @IsArray()
  @ArrayMinSize(1)
  images: string[];
}
