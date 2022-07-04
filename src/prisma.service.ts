import {
  Injectable,
  OnModuleInit,
  INestApplication,
  Optional,
  Inject,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaClientOptions } from '@prisma/client/runtime';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(
    @Optional()
    @Inject('DB_OPTIONS')
    opts?: PrismaClientOptions,
  ) {
    super(opts);
  }
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
