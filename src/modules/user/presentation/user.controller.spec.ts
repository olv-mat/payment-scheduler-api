import { FindAccountByOwnerIdUseCase } from 'src/modules/account/application/use-cases/find-account-by-owner-id.usecase';
import { AccountNotFoundError } from 'src/modules/account/domain/errors/account-not-found.error';
import { makeAccountEntity } from 'src/modules/account/tests/factories/account.entity.factory';
import { makeAccessTokenPayload } from 'src/modules/authentication/tests/factories/access-token-payload.type.factory';
import { DefaultResponseDto } from 'src/shared/presentation/dtos/default-response.dto';
import { PaginatedResponseDto } from 'src/shared/presentation/dtos/paginated-response.dto';
import { makeIdDto } from 'src/shared/tests/factories/id.dto.factory';
import { makeUseCaseMock } from 'src/shared/tests/mocks/use-case.mock';
import { DeleteUserUseCase } from '../application/use-cases/delete-user.usecase';
import { FindAllUsersUseCase } from '../application/use-cases/find-all-users.usecase';
import { FindUserByIdUseCase } from '../application/use-cases/find-user-by-id.usecase';
import { UpdateUserUseCase } from '../application/use-cases/update-user.usecase';
import { EmailAlreadyInUseError } from '../domain/errors/email-already-in-use.error';
import { UserNotFoundError } from '../domain/errors/user-not-found.error';
import { makeUpdateUserDto } from '../test/factories/update-user.dto.factory';
import { makeUserQueryDto } from '../test/factories/user-query.dto.factory';
import { makeUserEntity } from '../test/factories/user.entity.factory';
import { UserWithAccountResponseDto } from './dtos/user-with-account-response.dto';
import { UserController } from './user.controller';

describe('UserController', () => {
  let userController: UserController;
  const findUserByIdUseCaseMock = makeUseCaseMock();
  const findAccountByOwnerIdUseCaseMock = makeUseCaseMock();
  const updateUserUseCaseMock = makeUseCaseMock();
  const deleteUserUseCaseMock = makeUseCaseMock();
  const findAllUsersUseCaseMock = makeUseCaseMock();

  beforeEach(() => {
    jest.resetAllMocks();
    userController = new UserController(
      findUserByIdUseCaseMock as unknown as FindUserByIdUseCase,
      findAccountByOwnerIdUseCaseMock as unknown as FindAccountByOwnerIdUseCase,
      updateUserUseCaseMock as unknown as UpdateUserUseCase,
      deleteUserUseCaseMock as unknown as DeleteUserUseCase,
      findAllUsersUseCaseMock as unknown as FindAllUsersUseCase,
    );
  });

  describe('find', () => {
    it('should return a UserWithAccountResponseDto with the current user and their account', async () => {
      const tokenPayload = makeAccessTokenPayload();
      const userEntity = makeUserEntity();
      const accountEntity = makeAccountEntity();
      findUserByIdUseCaseMock.execute.mockResolvedValue(userEntity);
      findAccountByOwnerIdUseCaseMock.execute.mockResolvedValue(accountEntity);
      const response = await userController.find(tokenPayload);
      expect(findUserByIdUseCaseMock.execute).toHaveBeenCalledWith(
        tokenPayload.sub,
      );
      expect(findAccountByOwnerIdUseCaseMock.execute).toHaveBeenCalledWith(
        userEntity.id,
      );
      expect(response).toBeInstanceOf(UserWithAccountResponseDto);
    });

    it.each([new UserNotFoundError()])(
      'should propagate $name from FindUserByIdUseCase without fetching the account',
      async (error) => {
        const tokenPayload = makeAccessTokenPayload();
        findUserByIdUseCaseMock.execute.mockRejectedValue(error);
        await expect(userController.find(tokenPayload)).rejects.toThrow(error);
        expect(findUserByIdUseCaseMock.execute).toHaveBeenCalledWith(
          tokenPayload.sub,
        );
        expect(findAccountByOwnerIdUseCaseMock.execute).not.toHaveBeenCalled();
      },
    );

    it.each([new AccountNotFoundError()])(
      'should propagate $name from FindAccountByOwnerIdUseCase',
      async (error) => {
        const tokenPayload = makeAccessTokenPayload();
        const userEntity = makeUserEntity();
        findUserByIdUseCaseMock.execute.mockResolvedValue(userEntity);
        findAccountByOwnerIdUseCaseMock.execute.mockRejectedValue(error);
        await expect(userController.find(tokenPayload)).rejects.toThrow(error);
        expect(findUserByIdUseCaseMock.execute).toHaveBeenCalledWith(
          tokenPayload.sub,
        );
        expect(findAccountByOwnerIdUseCaseMock.execute).toHaveBeenCalledWith(
          userEntity.id,
        );
      },
    );
  });

  describe('update', () => {
    it('should return a DefaultResponseDto with a success message', async () => {
      const tokenPayload = makeAccessTokenPayload();
      const dto = makeUpdateUserDto();
      const response = await userController.update(tokenPayload, dto);
      expect(updateUserUseCaseMock.execute).toHaveBeenCalledWith(
        tokenPayload.sub,
        dto,
      );
      expect(response).toBeInstanceOf(DefaultResponseDto);
      expect(response.message).toBe('User updated successfully');
    });

    it.each([new UserNotFoundError(), new EmailAlreadyInUseError()])(
      'should propagate $name from UpdateUserUseCase',
      async (error) => {
        const tokenPayload = makeAccessTokenPayload();
        const dto = makeUpdateUserDto();
        updateUserUseCaseMock.execute.mockRejectedValue(error);
        await expect(userController.update(tokenPayload, dto)).rejects.toThrow(
          error,
        );
        expect(updateUserUseCaseMock.execute).toHaveBeenCalledWith(
          tokenPayload.sub,
          dto,
        );
      },
    );
  });

  describe('delete', () => {
    it('should return a DefaultResponseDto with a success message', async () => {
      const tokenPayload = makeAccessTokenPayload();
      const response = await userController.delete(tokenPayload);
      expect(deleteUserUseCaseMock.execute).toHaveBeenCalledWith(
        tokenPayload.sub,
      );
      expect(response).toBeInstanceOf(DefaultResponseDto);
      expect(response.message).toBe('User deleted successfully');
    });

    it.each([new UserNotFoundError()])(
      'should propagate $name from DeleteUserUseCase',
      async (error) => {
        const tokenPayload = makeAccessTokenPayload();
        deleteUserUseCaseMock.execute.mockRejectedValue(error);
        await expect(userController.delete(tokenPayload)).rejects.toThrow(
          error,
        );
        expect(deleteUserUseCaseMock.execute).toHaveBeenCalledWith(
          tokenPayload.sub,
        );
      },
    );
  });

  describe('findAll', () => {
    it('should return a PaginatedResponseDto with the users returned by the use case', async () => {
      const dto = makeUserQueryDto({ offset: 0, limit: 10 });
      findAllUsersUseCaseMock.execute.mockResolvedValue([
        [makeUserEntity()],
        1,
      ]);
      const response = await userController.findAll(dto);
      expect(findAllUsersUseCaseMock.execute).toHaveBeenCalledWith(dto);
      expect(response).toBeInstanceOf(PaginatedResponseDto);
    });
  });

  describe('findOne', () => {
    it('should return a UserWithAccountResponseDto for the requested user and their account', async () => {
      const dto = makeIdDto();
      const userEntity = makeUserEntity();
      const accountEntity = makeAccountEntity();
      findUserByIdUseCaseMock.execute.mockResolvedValue(userEntity);
      findAccountByOwnerIdUseCaseMock.execute.mockResolvedValue(accountEntity);
      const response = await userController.findOne(dto);
      expect(findUserByIdUseCaseMock.execute).toHaveBeenCalledWith(dto.id);
      expect(findAccountByOwnerIdUseCaseMock.execute).toHaveBeenCalledWith(
        userEntity.id,
      );
      expect(response).toBeInstanceOf(UserWithAccountResponseDto);
    });

    it.each([new UserNotFoundError()])(
      'should propagate $name from FindUserByIdUseCase without fetching the account',
      async (error) => {
        const dto = makeIdDto();
        findUserByIdUseCaseMock.execute.mockRejectedValue(error);
        await expect(userController.findOne(dto)).rejects.toThrow(error);
        expect(findUserByIdUseCaseMock.execute).toHaveBeenCalledWith(dto.id);
        expect(findAccountByOwnerIdUseCaseMock.execute).not.toHaveBeenCalled();
      },
    );

    it.each([new AccountNotFoundError()])(
      'should propagate $name from FindAccountByOwnerIdUseCase',
      async (error) => {
        const dto = makeIdDto();
        const userEntity = makeUserEntity();
        findUserByIdUseCaseMock.execute.mockResolvedValue(userEntity);
        findAccountByOwnerIdUseCaseMock.execute.mockRejectedValue(error);
        await expect(userController.findOne(dto)).rejects.toThrow(error);
        expect(findUserByIdUseCaseMock.execute).toHaveBeenCalledWith(dto.id);
        expect(findAccountByOwnerIdUseCaseMock.execute).toHaveBeenCalledWith(
          userEntity.id,
        );
      },
    );
  });
});
