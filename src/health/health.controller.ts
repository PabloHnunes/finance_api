import { Controller, Get } from '@nestjs/common';
import {
  HealthCheckService,
  PrismaHealthIndicator,
  HealthCheck,
} from '@nestjs/terminus';
import { PrismaService } from '../prisma/prisma.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Public } from '@/decorators/public.decorator';

@Controller('health')
@ApiBearerAuth()
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: PrismaHealthIndicator,
    private readonly prisma: PrismaService,
  ) {}

  @Get()
  @HealthCheck()
  @Public()
  check() {
    return this.health.check([
      () => this.db.pingCheck('database', this.prisma),
    ]);
  }
}
