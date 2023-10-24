import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as path from 'path';
import * as fs from 'fs';
import { SessionService } from '../session/session.service';
import getPrivateKey from 'src/utils/getPrivateKeyFromFile';
import { AuthUserDTO } from 'src/users/dto/AuthUser.dto';
import { UsersService } from 'src/users/users.service';
import * as DTO from './dto';
import { CreateSessionDTO } from 'src/session/dto/CreateSession.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private sessionService: SessionService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    const payload = await this.usersService.validateUser(email, password);

    const auth = await this.generatePublicToken(payload);

    await this.sessionService.unactiveSessionsUserId(payload.id);

    await this.createSession(
      auth.access_private_token,
      payload.id,
      auth.expiresIn,
    );

    return new DTO.ResponseAuthDTO(
      'Solicitação de login executada com sucesso.',
      auth,
      [],
    );
  }

  async logout(request: any) {
    const authorizationHeader =
      (request.headers && request.headers.authorization) ||
      (request.switchToHttp().getRequest().headers &&
        request.switchToHttp().getRequest().headers.authorization);
    const token = authorizationHeader
      ? authorizationHeader.split(' ')[1]
      : undefined;
    await this.sessionService.unactiveSession(token);

    return new DTO.ResponseLogoutDTO(
      'Solicitação de logout executada com sucesso.',
      {},
      [],
    );
  }
  async reauthenticate(data: DTO.RefreshDTO): Promise<DTO.ResponseAuthDTO> {
    const user: AuthUserDTO = await this.verifyPublicRefreshToken(
      data.refresh_private_token,
    );
    const refreshAuth = await this.generatePublicToken(user);

    await this.sessionService.unactiveSession(data.access_private_token);

    await this.createSession(
      refreshAuth.access_private_token,
      user.id,
      refreshAuth.expiresIn,
    );

    return new DTO.ResponseAuthDTO(
      'Token atualizado com sucesso.',
      refreshAuth,
      [],
    );
  }

  async generatePublicTokenTemp(email: string) {
    const payload = await this.usersService.validateUser(email);
    return await this.jwtService.signAsync(
      { ...payload },
      {
        secret: getPrivateKey(),
        expiresIn: '1m',
      },
    );
  }

  private async generatePublicToken(payload: AuthUserDTO) {
    return new DTO.AuthDTO(
      await this.jwtService.signAsync(
        { ...payload },
        {
          secret: getPrivateKey(),
          expiresIn: '1h',
        },
      ),
      await this.jwtService.signAsync(
        { ...payload, refresh: true },
        {
          secret: fs.readFileSync(
            path.resolve(__dirname, process.env.PRIVATE_REFRESH_KEY_PATH),
            'utf8',
          ),
          expiresIn: '2h',
        },
      ),
      3600000,
    );
  }

  private async verifyPublicRefreshToken(
    refresh_token: string,
  ): Promise<AuthUserDTO> {
    if (!refresh_token) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const email = this.jwtService.decode(refresh_token)['email'];

    const authUser = await this.usersService.validateUser(email);

    try {
      await this.jwtService.verify(refresh_token, {
        secret: fs.readFileSync(
          path.resolve(__dirname, process.env.PRIVATE_REFRESH_KEY_PATH),
          'utf8',
        ),
        ignoreExpiration: false,
      });
      return authUser;
    } catch (err) {
      if (err.name === 'JsonWebTokenError') {
        throw new BadRequestException('Assinatura Inválida');
      }
      if (err.name === 'TokenExpiredError') {
        throw new BadRequestException('Token Expirado');
      }
      throw new BadRequestException(err.name);
    }
  }

  private async createSession(
    token: string,
    user_id: number,
    expires_in: number,
  ) {
    const date_created = new Date();

    const date_expiration = new Date(date_created.getTime() + expires_in);

    const session = new CreateSessionDTO(
      token,
      user_id,
      new Date() < date_expiration,
      date_created,
      date_expiration,
    );

    await this.sessionService.createSession(session);
  }
}
