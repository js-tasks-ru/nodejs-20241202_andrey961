import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  
  @IsString()
  @IsNotEmpty()
  description: string;
  
  @IsOptional()
  isCompleted: boolean;
}
