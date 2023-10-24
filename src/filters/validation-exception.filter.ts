import {
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { CustomException } from '../exceptions/custom.exception';

@Catch(HttpException)
export class ValidationExceptionFilter extends BaseExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (exception) {
      const errors: any[] = [];
      const message = exception.getResponse()['message'];

      if (Array.isArray(message)) {
        message.forEach((msg) => {
          if (typeof msg === 'string') {
            let reference: string;
            const message = msg.split('Campo')[1]
              ? 'Campo' + msg.split('Campo')[1]
              : msg;
            let field: string;
            if (msg.match(/'([^']*)'/)) {
              field = msg.match(/'([^']*)'/)[1];
            }
            if (msg.split('Campo')[0]) {
              reference = msg.split('Campo')[0];
            }
            const error = { reference, message, field };
            errors.push(error);
          }
        });
      } else if (typeof message === 'string') {
        errors.push(message);
      }

      const customException = new CustomException(
        'Erro ao executar a solicitação.',
        {},
        errors,
        exception.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR,
      );

      return response
        .status(customException.getStatus())
        .json(customException.getResponse());
    }

    super.catch(exception, host);
  }
}
