import { PartialType } from '@nestjs/swagger';
import { loginDto } from './create-auth.dto';

export class UpdateAuthDto extends PartialType(loginDto) {}
