import { ApiProperty } from '@nestjs/swagger';

export class ResponseLogoutDTO {
  @ApiProperty()
  message: string;
  @ApiProperty()
  response: object;
  @ApiProperty()
  errors: any[];

  constructor(message: string, response: object, errors: any[]) {
    this.message = message;
    this.response = response;
    this.errors = errors;
  }
}
