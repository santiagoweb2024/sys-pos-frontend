import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from './database.service';
import { LoggerService } from '@/shared/services/logger.service';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [DatabaseService, LoggerService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
