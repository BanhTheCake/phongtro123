import { IsNotEmpty } from 'class-validator';

export class loginDto {
  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  password: string;
}
