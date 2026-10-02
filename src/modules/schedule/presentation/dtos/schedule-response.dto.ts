import { ScheduleStatus } from '../../domain/enums/schedule-status.enum';

type ScheduleResponseProperties = {
  id: string;
  payer: string;
  receiver: string;
  value: number;
  scheduledFor: Date;
  status: ScheduleStatus;
};

export class ScheduleResponseDto {
  public readonly id: string;
  public readonly payer: string;
  public readonly receiver: string;
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
