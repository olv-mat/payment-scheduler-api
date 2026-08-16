export abstract class Comparer {
  public abstract compare(value: string, hash: string): Promise<boolean>;
}
