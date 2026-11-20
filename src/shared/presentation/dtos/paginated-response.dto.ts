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
  hasMore: boolean;
};

export class PaginatedResponseDto {
  public readonly items: object[];
  public readonly meta: PaginationMetaProperties;

  private constructor(properties: PaginatedResponseProperties) {
    const { items, total, offset, limit } = properties;
    const hasMore = offset + items.length < total;
    this.items = items;
    this.meta = { total, offset, limit, hasMore };
  }

  public static create(
    properties: PaginatedResponseProperties,
  ): PaginatedResponseDto {
    const { items, total, offset, limit } = properties;
    return new PaginatedResponseDto({ items, total, offset, limit });
  }
}
