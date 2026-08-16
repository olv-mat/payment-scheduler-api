export abstract class Hasher {
  public abstract hash(value: string): Promise<string>;
}
