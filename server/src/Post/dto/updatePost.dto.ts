import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class updatePostDto {
  @IsOptional()
  address: string;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  area: number;

  @IsOptional()
  category: string;

  @IsOptional()
  description: string;

  @IsOptional()
  distinct: string;

  @IsOptional()
  gender: string;

  @IsOptional()
  images: string[];

  @IsOptional()
  label: string;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  price: number;

  @IsOptional()
  province: string;

  @IsOptional()
  title: string;

  @IsOptional()
  type: string;
}
