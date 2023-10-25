import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { hashSync, genSaltSync } from 'bcrypt';
import { Observable } from 'rxjs';

@Injectable()
export class PasswordInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    if (request.body && request.body.password) {
      request.body.password = hashSync(request.body.password, genSaltSync());
    }

    return next.handle();
  }
}
