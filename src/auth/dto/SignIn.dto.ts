import { ApiProperty } from '@nestjs/swagger';
import { IsValidator } from 'src/decorators/validator.decorator';

export class SignInDTO {
  @ApiProperty()
  @IsValidator('string')
  username: string;
  @ApiProperty()
  @IsValidator('string')
  password: string;
}
