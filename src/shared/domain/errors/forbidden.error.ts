export abstract class ForbiddenError extends Error {
  constructor(message: string) {
    super(message);
    this.name = new.target.name;
  }
}
