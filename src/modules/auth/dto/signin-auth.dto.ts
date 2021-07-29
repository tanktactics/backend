import { IsEmail, IsString, IsDefined } from 'class-validator';

export class SignInDto {
  @IsString()
  @IsDefined()
  @IsEmail()
  email: string;

  @IsString()
  @IsDefined()
  password: string;
}
