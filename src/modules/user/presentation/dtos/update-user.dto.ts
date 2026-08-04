import { PartialType } from '@nestjs/swagger';
import { UpdateUserPayload } from '../../domain/types/update-user-payload.type';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto
  extends PartialType(CreateUserDto)
  implements UpdateUserPayload {}
