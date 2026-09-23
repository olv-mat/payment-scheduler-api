import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { ConflictError } from 'src/shared/domain/errors/conflict.error';
import { NotFoundError } from 'src/shared/domain/errors/not-found.error';
import { UnauthorizedError } from 'src/shared/domain/errors/unauthorized.error';
import { UnprocessableEntityError } from 'src/shared/domain/errors/unprocessable-entity.error';

interface ErrorResponseBody {
  message: string | string[];
  error: string;
  statusCode: HttpStatus;
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  public catch(exception: unknown, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<Response>();
    const body = this.resolve(exception);

    if (body.statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(
        exception instanceof Error ? exception.stack : exception,
      );
    }

    response.status(body.statusCode).json(body);
  }

  private resolve(exception: unknown): ErrorResponseBody {
    if (exception instanceof HttpException) {
      return this.fromHttp(exception);
    }

    if (exception instanceof NotFoundError) {
      return this.build(HttpStatus.NOT_FOUND, exception.message);
    }

    if (exception instanceof ConflictError) {
      return this.build(HttpStatus.CONFLICT, exception.message);
    }

    if (exception instanceof UnprocessableEntityError) {
      return this.build(HttpStatus.UNPROCESSABLE_ENTITY, exception.message);
    }

    if (exception instanceof UnauthorizedError) {
      return this.build(HttpStatus.UNAUTHORIZED, exception.message);
    }

    return this.build(
      HttpStatus.INTERNAL_SERVER_ERROR,
      'Internal server error',
    );
  }

  private fromHttp(exception: HttpException): ErrorResponseBody {
    const statusCode: HttpStatus = exception.getStatus();
    const body = exception.getResponse();

    if (typeof body === 'string') {
      return this.build(statusCode, body);
    }

    const { message, error } = body as {
      message?: string | string[];
      error?: string;
    };

    return {
      message: message ?? exception.message,
      error: error ?? this.labelFor(statusCode),
      statusCode: statusCode,
    };
  }

  private build(statusCode: HttpStatus, message: string): ErrorResponseBody {
    return {
      message: message,
      error: this.labelFor(statusCode),
      statusCode: statusCode,
    };
  }

  private labelFor(statusCode: HttpStatus): string {
    return HttpStatus[statusCode]
      .split('_')
      .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
      .join(' ');
  }
}
