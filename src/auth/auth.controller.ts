import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import * as DTO from './dto';
import { Public } from 'src/decorators/public.decorator';
import { SwaggerResponse } from 'src/decorators/swagger.decorator';

@Controller('auth')
@ApiTags('auth')
@ApiBearerAuth()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  @SwaggerResponse(400, 401)
  @ApiOkResponse({
    description: 'Login realizado com sucesso!',
    type: DTO.ResponseAuthDTO,
  })
  async signIn(@Body() signInDto: DTO.SignInDTO) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }
  @Public()
  @Post('refresh-token')
  @ApiOkResponse({
    description: 'Token atualizado com sucesso.',
    type: DTO.ResponseAuthDTO,
  })
  @SwaggerResponse(400)
  async reauthenticate(@Body() data: DTO.RefreshDTO) {
    return await this.authService.reauthenticate(data);
  }

  @Post('logout')
  @SwaggerResponse(400, 401)
  @ApiOkResponse({
    description: 'Solicitação de logout executada com sucesso.',
    type: DTO.ResponseLogoutDTO,
  })
  async logout(@Req() request: any): Promise<any> {
    return await this.authService.logout(request);
  }
}
