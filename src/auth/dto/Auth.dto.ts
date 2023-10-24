import { ApiProperty } from '@nestjs/swagger';

export class AuthDTO {
  @ApiProperty()
  access_private_token: string;
  @ApiProperty()
  refresh_private_token: string;
  @ApiProperty()
  expiresIn: number;

  constructor(
    access_private_token: string,
    refresh_private_token: string,
    expiresIn: number,
  ) {
    this.access_private_token = access_private_token;
    this.refresh_private_token = refresh_private_token;
    this.expiresIn = expiresIn;
  }
}
