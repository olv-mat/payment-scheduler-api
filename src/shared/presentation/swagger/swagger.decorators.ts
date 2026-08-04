import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
} from '@nestjs/swagger';

export const SwaggerOperation = (
  summary: string,
  description: string | null = null,
) => {
  return description
    ? ApiOperation({ summary: summary, description: description })
    : ApiOperation({ summary: summary });
};

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
