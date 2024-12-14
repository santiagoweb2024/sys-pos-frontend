interface ProcessEnv extends NodeJS.ProcessEnv {
  DATABASE_URL: string;
  PORT: string;
}

process.loadEnvFile();

const { DATABASE_URL, PORT }: ProcessEnv = process.env;
if (!DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined');
}
if (!PORT) {
  throw new Error('PORT is not defined');
}

export const config = {
  port: PORT,
  database: {
    url: DATABASE_URL,
  },
};
