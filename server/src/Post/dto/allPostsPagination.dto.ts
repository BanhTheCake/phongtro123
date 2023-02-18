import { Transform } from 'class-transformer';
import { IsOptional, IsInt, IsPositive, IsIn } from 'class-validator';
import { paginationDto } from 'utils/dto/pagination.dto';

const order = ['createdAt', 'updatedAt', 'star'] as const;
export type statusType = (typeof order)[number];

export class allPostsPagination extends paginationDto {
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  minPrice?: number;

  @IsOptional()
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  maxPrice?: number;

  @IsOptional()
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  minArea?: number;

  @IsOptional()
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  maxArea?: number;

  @IsOptional()
  category?: string;

  @IsOptional()
  province?: string;

  @IsOptional()
  @IsIn(order)
  order?: statusType;
}
