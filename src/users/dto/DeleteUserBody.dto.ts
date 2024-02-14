import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { IsValidator } from 'src/decorators/validator.decorator';

class IdUserModel {
  @ApiProperty()
  @IsValidator('number')
  id: string;
}

export class DeleteUserBodyDTO {
  @ApiProperty({ type: [IdUserModel] })
  @ValidateNested({ each: true })
  @Type(() => IdUserModel)
  list: IdUserModel[];
}
