import { IsString, MinLength, Matches } from 'class-validator';

export class LoginDto {
  @IsString()
  @Matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$|^[a-zA-Z0-9_.-]{3,}$/i, {
    message: 'Vui lòng nhập email hợp lệ hoặc username tối thiểu 3 ký tự',
  })
  identifier: string;

  @IsString()
  @MinLength(6)
  password: string;
}