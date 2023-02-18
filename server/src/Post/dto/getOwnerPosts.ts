import { IsOptional, IsIn } from 'class-validator';

const status = ['public', 'expire', 'all'] as const;
export type statusType = (typeof status)[number];

export class getOwnerPosts {
  @IsOptional()
  @IsIn(status)
  status?: statusType;
}
