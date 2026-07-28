import { ApiInternalServerErrorResponse, ApiOperation } from '@nestjs/swagger';

export const SwaggerOperation = (
  summary: string,
  description: string | null = null,
) => {
  return description
    ? ApiOperation({ summary: summary, description: description })
    : ApiOperation({ summary: summary });
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
