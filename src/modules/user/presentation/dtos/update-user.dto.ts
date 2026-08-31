import { PartialType } from '@nestjs/swagger';
import { UpdateUserInput } from '../../domain/types/update-user-input.type';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto
  extends PartialType(CreateUserDto)
  implements UpdateUserInput {}
