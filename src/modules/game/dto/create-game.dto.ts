import {
  IsArray,
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateGameDto {
  @IsString()
  @IsDefined()
  name: string;

  @IsNumber()
  @IsOptional()
  boardWidth?: number;

  @IsNumber()
  @IsOptional()
  boardHeight?: number;

  @IsUUID(4, { each: true })
  @IsDefined()
  players: String[];
}
