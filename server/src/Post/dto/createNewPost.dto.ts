import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class createNewPostDto {
  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  area: number;

  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  distinct: string;

  @IsNotEmpty()
  gender: string;

  @IsNotEmpty()
  images: string[];

  @IsNotEmpty()
  label: string;

  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  price: number;

  @IsNotEmpty()
  province: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  type: string;
}
