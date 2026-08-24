export abstract class CryptographyComparer {
  public abstract compare(value: string, hash: string): Promise<boolean>;
}
