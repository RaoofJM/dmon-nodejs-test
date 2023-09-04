import { IsOptional, IsString } from 'class-validator';

export class FindAllTasksDto {
  @IsString()
  @IsOptional()
  page?: number;

  @IsString()
  @IsOptional()
  limit?: number;
}
