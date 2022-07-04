import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';

const HOST = process.env.DB_HOST;

let dbOptions = null;

if (HOST) {
  const PASSWORD = process.env.DB_PASS;
  const USER = process.env.DB_USER;
  const NAME = process.env.DB_NAME;

  const DB_CONNECTION_STRING = `mysql://${USER}:${PASSWORD}@${HOST}/${NAME}?ssl={"rejectUnauthorized":true}`;

  dbOptions = {
    datasources: {
      db: {
        url: DB_CONNECTION_STRING,
      },
    },
  };
}

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    {
      provide: 'DB_OPTIONS',
      useValue: dbOptions,
    },
  ],
})
export class AppModule {}
