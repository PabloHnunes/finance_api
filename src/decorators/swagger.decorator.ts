import { ApiResponse } from '@nestjs/swagger';
import { CustomException } from '../exceptions/custom.exception';

export const SwaggerResponse = (...statusCodes: number[]): MethodDecorator => {
  return (
    target: any,
    key: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    statusCodes.forEach((statusCode) => {
      ApiResponse({
        status: statusCode,
        description: getDescription(statusCode),
        type: CustomException,
      })(target, key, descriptor);
    });
  };
};

function getDescription(statusCode: number): string {
  switch (statusCode) {
    case 400:
      return 'Falha da requisição';
    case 401:
      return 'Falha de autenticação';
    case 404:
      return 'Não encontrado';
    default:
      return '';
  }
}
