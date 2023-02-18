import { IsNotEmpty } from 'class-validator';

export class changePasswordDto {
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  newPassword: string;
}
