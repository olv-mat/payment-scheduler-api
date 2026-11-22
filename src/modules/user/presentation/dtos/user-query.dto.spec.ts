import { validate } from 'class-validator';
import 'reflect-metadata';
import { makeUserQueryDto } from '../../test/factories/user-query.dto.factory';

describe('UserQueryDto', () => {
  it('should accept when all fields are valid', async () => {
    const dto = makeUserQueryDto({ name: 'John Doe' });
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should accept when no fields are provided', async () => {
    const dto = makeUserQueryDto();
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  describe('name', () => {
    it('should fail if is empty', async () => {
      const dto = makeUserQueryDto({ name: '' });
      const errors = await validate(dto);
      expect(errors.length).toBe(1);
      const error = errors[0];
      expect(error.property).toBe('name');
      expect(error.constraints).toHaveProperty('isNotEmpty');
    });

    it('should fail if is not a string', async () => {
      const dto = makeUserQueryDto({ name: ['John Doe', 'Jane Doe'] });
      const errors = await validate(dto);
      expect(errors.length).toBe(1);
      const error = errors[0];
      expect(error.property).toBe('name');
      expect(error.constraints).toHaveProperty('isString');
    });
  });
});
