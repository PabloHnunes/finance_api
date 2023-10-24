import { ApiProperty } from '@nestjs/swagger';
import { IsValidator } from 'src/decorators/validator.decorator';

export class RefreshDTO {
  @ApiProperty()
  @IsValidator('string')
  access_private_token: string;

  @ApiProperty()
  @IsValidator('string')
  refresh_private_token: string;
}
