type PaginatedResponseProperties = {
  items: object[];
  total: number;
  offset: number;
  limit: number;
};

type PaginationMetaProperties = {
  total: number;
  offset: number;
  limit: number;
};

export class PaginatedResponseDto {
  public readonly items: object[];
  public readonly meta: PaginationMetaProperties;

  private constructor(properties: PaginatedResponseProperties) {
    const { items, total, offset, limit } = properties;
    this.items = items;
    this.meta = { total, offset, limit };
  }

  public static create(
    properties: PaginatedResponseProperties,
  ): PaginatedResponseDto {
    return new PaginatedResponseDto({
      items: properties.items,
      total: properties.total,
      offset: properties.offset,
      limit: properties.limit,
    });
  }
}
