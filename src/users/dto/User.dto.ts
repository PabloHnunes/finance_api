import { ApiProperty } from '@nestjs/swagger';
import { IsValidator } from 'src/decorators/validator.decorator';

export class UserDTO {
  @ApiProperty()
  @IsValidator('number')
  id: number;
  @ApiProperty()
  @IsValidator('string')
  name: string;
  @ApiProperty()
  @IsValidator('string')
  username: string;
  @ApiProperty()
  @IsValidator('string')
  email: string;
  @ApiProperty()
  @IsValidator('string')
  document: string;
  @ApiProperty()
  @IsValidator('number')
  profile_id: number;

  constructor(
    id: number,
    name: string,
    username: string,
    email: string,
    document: string,
    profile_id: number,
  ) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.email = email;
    this.document = document;
    this.profile_id = profile_id;
  }
}
