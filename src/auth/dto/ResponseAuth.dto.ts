import { ApiProperty } from '@nestjs/swagger';
import { AuthDTO } from './Auth.dto';

export class ResponseAuthDTO {
  @ApiProperty()
  message: string;
  @ApiProperty({
    type: AuthDTO,
  })
  response: AuthDTO;
  @ApiProperty()
  errors: any[];

  constructor(message: string, response: AuthDTO, errors: any[]) {
    this.message = message;
    this.response = response;
    this.errors = errors;
  }
}
