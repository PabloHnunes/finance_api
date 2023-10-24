import { Module } from '@nestjs/common';
import { CustomException } from './custom.exception';

@Module({
  providers: [CustomException],
  exports: [CustomException],
})
export class ExceptionsModule {}
