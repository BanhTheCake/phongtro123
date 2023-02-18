import { IsOptional } from 'class-validator';

export class updateDataUserDto {
  @IsOptional()
  image?: string;

  @IsOptional()
  name?: string;

  @IsOptional()
  url?: string;

  @IsOptional()
  zalo?: string;
}
