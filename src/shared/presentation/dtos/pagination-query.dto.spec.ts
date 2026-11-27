import { validate } from 'class-validator';
import 'reflect-metadata';
import { makePaginationQueryDto } from '../../tests/factories/pagination-query.dto.factory';

describe('PaginationQueryDto', () => {
  it('should accept when all fields are valid', async () => {
    const dto = makePaginationQueryDto({ offset: 0, limit: 10 });
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should accept when no fields are provided', async () => {
    const dto = makePaginationQueryDto();
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  describe('offset', () => {
    it('should fail if is not an integer', async () => {
      const dto = makePaginationQueryDto({ offset: '1' });
      const errors = await validate(dto);
      expect(errors.length).toBe(1);
      const error = errors[0];
      expect(error.property).toBe('offset');
      expect(error.constraints).toHaveProperty('isInt');
    });

    it('should fail if is negative', async () => {
      const dto = makePaginationQueryDto({ offset: -1 });
      const errors = await validate(dto);
      expect(errors.length).toBe(1);
      const error = errors[0];
      expect(error.property).toBe('offset');
      expect(error.constraints).toHaveProperty('min');
    });
  });

  describe('limit', () => {
    it('should fail if is not an integer', async () => {
      const dto = makePaginationQueryDto({ limit: '1' });
      const errors = await validate(dto);
      expect(errors.length).toBe(1);
      const error = errors[0];
      expect(error.property).toBe('limit');
      expect(error.constraints).toHaveProperty('isInt');
    });

    it('should fail if is less than 1', async () => {
      const dto = makePaginationQueryDto({ limit: 0 });
      const errors = await validate(dto);
      expect(errors.length).toBe(1);
      const error = errors[0];
      expect(error.property).toBe('limit');
      expect(error.constraints).toHaveProperty('min');
    });

    it('should fail if is greater than 50', async () => {
      const dto = makePaginationQueryDto({ limit: 51 });
      const errors = await validate(dto);
      expect(errors.length).toBe(1);
      const error = errors[0];
      expect(error.property).toBe('limit');
      expect(error.constraints).toHaveProperty('max');
    });
  });
});
