import { IsEmail, IsString, IsDefined } from 'class-validator';

export class SignUpDto {
  @IsString()
  @IsDefined()
  username: string;

  @IsString()
  @IsDefined()
  @IsEmail()
  email: string;

  @IsString()
  @IsDefined()
  password: string;
}
