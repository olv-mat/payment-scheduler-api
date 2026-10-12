export abstract class ScheduleQueue {
  public abstract enqueue(reference: string, time: Date): Promise<void>;
}
