import { ApiProperty } from '@nestjs/swagger';
import { IsValidator } from 'src/decorators/validator.decorator';

export class CreateUserBodyDTO {
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
}
