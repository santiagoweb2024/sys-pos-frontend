declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    PORT: string;
    BASE_URL: string;
    API_PREFIX: string;
  }
}
