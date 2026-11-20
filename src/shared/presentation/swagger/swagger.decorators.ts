import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiExtraModels,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
  getSchemaPath,
} from '@nestjs/swagger';

export const SwaggerOperation = (
  summary: string,
  description: string | null = null,
) => {
  return description
    ? ApiOperation({ summary: summary, description: description })
    : ApiOperation({ summary: summary });
};

export const SwaggerBearerAuth = () => {
  return ApiBearerAuth();
};

export const SwaggerPaginatedResponse = (model: Type<unknown>) => {
  return applyDecorators(
    ApiExtraModels(model),
    ApiOkResponse({
      schema: {
        required: ['items', 'meta'],
        properties: {
          items: {
            type: 'array',
            items: { $ref: getSchemaPath(model) },
          },
          meta: {
            type: 'object',
            required: ['total', 'offset', 'limit', 'hasMore'],
            properties: {
              total: { type: 'number', example: 100 },
              offset: { type: 'number', example: 0 },
              limit: { type: 'number', example: 10 },
              hasMore: { type: 'boolean', example: true },
            },
          },
        },
      },
    }),
  );
};

export const SwaggerBadRequest = (message: string) => {
  return ApiBadRequestResponse({
    schema: {
      example: {
        message: message,
        error: 'Bad Request',
        statusCode: 400,
      },
    },
  });
};

export const SwaggerUnauthorized = (message: string) => {
  return ApiUnauthorizedResponse({
    schema: {
      example: {
        message: message,
        error: 'Unauthorized',
        statusCode: 401,
      },
    },
  });
};

export const SwaggerForbidden = (message: string) =>
  ApiForbiddenResponse({
    schema: {
      example: {
        message: message,
        error: 'Forbidden',
        statusCode: 403,
      },
    },
  });

export const SwaggerNotFound = (message: string) => {
  return ApiNotFoundResponse({
    schema: {
      example: {
        message: message,
        error: 'Not Found',
        statusCode: 404,
      },
    },
  });
};

export const SwaggerConflict = (message: string) => {
  return ApiConflictResponse({
    schema: {
      example: {
        message: message,
        error: 'Conflict',
        statusCode: 409,
      },
    },
  });
};

export const SwaggerUnprocessableEntity = (message: string) => {
  return ApiUnprocessableEntityResponse({
    schema: {
      example: {
        message: message,
        error: 'Unprocessable Entity',
        statusCode: 422,
      },
    },
  });
};

export const SwaggerInternalServerError = () => {
  return ApiInternalServerErrorResponse({
    schema: {
      example: {
        statusCode: 500,
        message: 'Internal server error',
      },
    },
  });
};
