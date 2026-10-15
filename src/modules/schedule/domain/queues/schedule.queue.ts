export abstract class ScheduleQueue {
  public abstract enqueue(scheduleId: string, delay: number): Promise<void>;
}
