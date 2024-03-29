import { ApiProperty } from '@nestjs/swagger';
import { IsValidator } from 'src/decorators/validator.decorator';

export class UpdateUserBodyDTO {
  @ApiProperty()
  @IsValidator('number')
  id: string;
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
  password: string;
  @ApiProperty()
  @IsValidator('string')
  document: string;
  @ApiProperty()
  @IsValidator('number')
  profile_id: number;

  constructor(
    id: string,
    name: string,
    username: string,
    email: string,
    password: string,
    document: string,
    profile_id: number,
  ) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.email = email;
    this.password = password;
    this.document = document;
    this.profile_id = profile_id;
  }
}
