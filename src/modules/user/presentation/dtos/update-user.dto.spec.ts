import { validate } from 'class-validator';
import { makeUpdateUserDto } from '../../test/factories/update-user.dto.factory';

describe('UpdateUserDto', () => {
  it('should accept when all fields are valid', async () => {
    const dto = makeUpdateUserDto({
      name: 'John Doe',
      email: 'john.doe@test.com',
      password: '@JohnDoe123',
    });
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should accept when no fields are provided', async () => {
    const dto = makeUpdateUserDto();
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  describe('name', () => {
    it('should fail if is empty', async () => {
      const dto = makeUpdateUserDto({ name: '' });
      const errors = await validate(dto);
      expect(errors.length).toBe(1);
      const error = errors[0];
      expect(error.property).toBe('name');
      expect(error.constraints).toHaveProperty('isNotEmpty');
    });

    it('should fail if is not a string', async () => {
      const dto = makeUpdateUserDto({ name: 123 });
      const errors = await validate(dto);
      expect(errors.length).toBe(1);
      const error = errors[0];
      expect(error.property).toBe('name');
      expect(error.constraints).toHaveProperty('isString');
    });
  });

  describe('email', () => {
    it('should fail if is empty', async () => {
      const dto = makeUpdateUserDto({ email: '' });
      const errors = await validate(dto);
      expect(errors.length).toBe(1);
      const error = errors[0];
      expect(error.property).toBe('email');
      expect(error.constraints).toHaveProperty('isNotEmpty');
    });

    it('should fail if is not an email', async () => {
      const dto = makeUpdateUserDto({ email: 'john.doe' });
      const errors = await validate(dto);
      expect(errors.length).toBe(1);
      const error = errors[0];
      expect(error.property).toBe('email');
      expect(error.constraints).toHaveProperty('isEmail');
    });
  });

  describe('password', () => {
    it('should fail if is empty', async () => {
      const dto = makeUpdateUserDto({ password: '' });
      const errors = await validate(dto);
      expect(errors.length).toBe(1);
      const error = errors[0];
      expect(error.property).toBe('password');
      expect(error.constraints).toHaveProperty('isNotEmpty');
    });

    it('should fail if is not strong', async () => {
      const dto = makeUpdateUserDto({ password: '123' });
      const errors = await validate(dto);
      expect(errors.length).toBe(1);
      const error = errors[0];
      expect(error.property).toBe('password');
      expect(error.constraints).toHaveProperty('isStrongPassword');
    });
  });
});
