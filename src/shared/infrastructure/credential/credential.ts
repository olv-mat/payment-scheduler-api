export abstract class Credential {
  public abstract sign<T extends object>(payload: T): Promise<string>;
}
