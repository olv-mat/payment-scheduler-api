export abstract class Signer {
  public abstract sign<T extends object>(payload: T): Promise<string>;
}
