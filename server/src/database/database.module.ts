import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from './database.service';

export const DB_CONNECTION = 'DB_CONNECTION';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    DatabaseService,
    {
      provide: DB_CONNECTION,
      useFactory: (databaseService: DatabaseService) =>
        databaseService.database,
      inject: [DatabaseService],
    },
  ],
  exports: [DB_CONNECTION],
})
export class DatabaseModule {}
