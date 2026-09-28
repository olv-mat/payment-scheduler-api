import { AccountResponseDto } from 'src/modules/account/presentation/dtos/account-response.dto';
import { ScheduleStatus } from '../../domain/enums/schedule-status.enum';

type ScheduleResponseProperties = {
  id: string;
  payer: AccountResponseDto;
  receiver: AccountResponseDto;
  value: number;
  scheduledFor: Date;
  status: ScheduleStatus;
};

export class ScheduleResponseDto {
  public readonly id: string;
  public readonly payer: AccountResponseDto;
  public readonly receiver: AccountResponseDto;
  public readonly value: number;
  public readonly scheduledFor: Date;
  public readonly status: ScheduleStatus;

  constructor(properties: ScheduleResponseProperties) {
    this.id = properties.id;
    this.payer = properties.payer;
    this.receiver = properties.receiver;
    this.value = properties.value;
    this.scheduledFor = properties.scheduledFor;
    this.status = properties.status;
  }
}
