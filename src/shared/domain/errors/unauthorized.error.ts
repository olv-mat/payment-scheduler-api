export abstract class UnauthorizedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = new.target.name;
  }
}
