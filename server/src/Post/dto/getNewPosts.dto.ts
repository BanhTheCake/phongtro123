import { Transform } from 'class-transformer';
import { IsOptional, IsInt, IsPositive } from 'class-validator';
import { paginationDto } from 'utils/dto/pagination.dto';

export class getNewPostsDto {
  @IsOptional()
  @IsInt()
  @IsPositive()
  @Transform(({ value }) => parseInt(value))
  limit?: number;
}
