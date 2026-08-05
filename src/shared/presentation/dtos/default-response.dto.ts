export class DefaultResponseDto {
  public readonly message: string;

  private constructor(messsage: string) {
    this.message = messsage;
  }

  public static create(message: string): DefaultResponseDto {
    return new DefaultResponseDto(message);
  }
}
