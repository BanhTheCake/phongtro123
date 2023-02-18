import { IsNotEmpty, IsOptional, IsPositive, IsInt } from 'class-validator';
import { Transform } from 'class-transformer';

export class paginationDto {
  @IsOptional()
  @IsInt()
  @IsPositive()
  @Transform(({ value }) => parseInt(value))
  limit: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  @Transform(({ value }) => parseInt(value))
  page: number;
}
