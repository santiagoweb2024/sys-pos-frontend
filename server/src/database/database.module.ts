import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from './config/database.config';

@Global()
@Module({
  providers: [
    {
      provide: 'DB',
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        // Asegurarse de que DATABASE_URL esté definido
        const connectionString = configService.get<string>('DATABASE_URL');
        if (!connectionString) {
          throw new Error('DATABASE_URL is not defined');
        }

        // Configurar la conexión en DatabaseConfig
        DatabaseConfig.setConnectionString(connectionString);

        return DatabaseConfig.getDrizzle();
      },
    },
  ],
  exports: ['DB'],
})
export class DatabaseModule {}
