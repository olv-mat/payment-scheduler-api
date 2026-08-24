export abstract class CryptographySigner {
  public abstract sign<T extends object>(payload: T): Promise<string>;
}
