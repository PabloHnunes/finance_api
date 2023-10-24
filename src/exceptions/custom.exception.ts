import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class CustomException extends HttpException {
  @ApiProperty()
  message: string;

  @ApiProperty({ type: [String] })
  errors: string[];

  constructor(
    message: string,
    response: any,
    errors: any[],
    status: HttpStatus,
  ) {
    super(
      {
        message,
        response,
        errors,
      },
      status,
    );
  }
}
