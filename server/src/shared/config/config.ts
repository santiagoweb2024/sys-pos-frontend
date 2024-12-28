process.loadEnvFile();
const { DATABASE_URL, PORT, BASE_URL, API_PREFIX } = process.env;

export interface AppConfig {
  port: string;
  database: {
    url: string;
  };
  api: {
    baseUrl: string;
    apiPrefix: string;
  };
}

// Validar que todas las variables requeridas estén presentes
function validateEnvVariables() {
  const requiredVars: string[] = [
    'DATABASE_URL',
    'PORT',
    'BASE_URL',
    'API_PREFIX',
  ];
  for (const varName of requiredVars) {
    if (!process.env[varName]) {
      throw new Error(
        `Required environment variable ${varName} is not defined`,
      );
    }
  }
}

// Validar la configuración antes de exportarla
validateEnvVariables();

export const config: AppConfig = {
  port: PORT,
  database: {
    url: DATABASE_URL,
  },
  api: {
    baseUrl: BASE_URL,
    apiPrefix: API_PREFIX,
  },
};
