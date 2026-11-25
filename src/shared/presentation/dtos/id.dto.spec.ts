import { validate } from 'class-validator';
import { makeIdDto } from 'src/shared/tests/factories/id.dto.factory';

describe('IdDto', () => {
  it('should accept when is valid', async () => {
    const dto = makeIdDto();
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  describe('id', () => {
    it('should fail if is not a valid uuid', async () => {
      const dto = makeIdDto({ id: '' });
      const errors = await validate(dto);
      expect(errors.length).toBe(1);
      const error = errors[0];
      expect(error.property).toBe('id');
      expect(error.constraints).toHaveProperty('isUuid');
    });
  });
});
