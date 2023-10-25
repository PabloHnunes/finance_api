import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  Put,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SwaggerResponse } from 'src/decorators/swagger.decorator';
import * as DTO from './dto';
import { PasswordInterceptor } from 'src/interceptor/password.interceptor';

@Controller('users')
@ApiTags('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @SwaggerResponse(400, 401)
  @ApiOkResponse({
    description: 'Usuário criado com sucesso!',
    type: DTO.ResponseUserDTO,
  })
  @UseInterceptors(PasswordInterceptor)
  async createUser(@Body() data: DTO.CreateUserBodyDTO) {
    return await this.usersService.createUser(data);
  }

  @Put()
  @SwaggerResponse(400, 401, 404)
  @ApiOkResponse({
    description: 'Usuário atualizado com sucesso!',
    type: DTO.ResponseUserDTO,
  })
  @UseInterceptors(PasswordInterceptor)
  async updateUser(@Body() data: DTO.UpdateUserBodyDTO) {
    return await this.usersService.updateUser(data);
  }

  @Delete()
  @SwaggerResponse(400, 401, 404)
  @ApiOkResponse({
    description: 'Usuário(s) removido(s) com sucesso!',
    type: DTO.ResponseUserDTO,
  })
  async deleteUsers(@Body() data: DTO.DeleteUserBodyDTO) {
    return await this.usersService.deleteUsers(data);
  }
}
