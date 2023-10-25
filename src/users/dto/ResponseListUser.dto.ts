import { ApiProperty } from '@nestjs/swagger';
import { UserDTO } from './User.dto';

export class ResponseListUserDTO {
  @ApiProperty()
  message: string;
  @ApiProperty({
    type: [UserDTO],
  })
  response: UserDTO[];
  @ApiProperty()
  errors: any[];

  constructor(message: string, response: UserDTO[], errors: any[]) {
    this.message = message;
    this.response = response;
    this.errors = errors;
  }
}
