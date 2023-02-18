import { IsNotEmpty } from 'class-validator';

export class registerDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  password: string;
}
