declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    DOMAIN?: string;
    NODE_ENV: "production" | "development";
  }
}
