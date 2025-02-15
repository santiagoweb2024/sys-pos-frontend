declare namespace NodeJS {
  interface ProcessEnv {
    DB_POSTGRES_URL: string;
    API_PORT: string;
    API_BASE_URL: string;
    API_ROUTE_PREFIX: string;
    CLOUDINARY_CLOUD_NAME: string;
    CLOUDINARY_API_KEY: string;
    CLOUDINARY_API_SECRET: string;
    CLOUDINARY_URL: string;
  }
}
