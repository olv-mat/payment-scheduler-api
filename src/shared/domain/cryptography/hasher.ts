export abstract class CryptographyHasher {
  public abstract hash(value: string): Promise<string>;
}
