import { IsNotEmpty } from 'class-validator';

export class logoutDto {
  @IsNotEmpty()
  id: string;
}
