import { envSchema, EnvVars } from './env.validation';
process.loadEnvFile();
const parsedEnv = envSchema.safeParse(process.env);
if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables', parsedEnv.error.format());
  process.exit(1);
}

export const appConfig: EnvVars = parsedEnv.data;
