export abstract class Cryptography {
  public abstract hash(password: string): Promise<string>;
  public abstract compare(password: string, hash: string): Promise<boolean>;
}
