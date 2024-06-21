declare namespace NodeJS {
  interface ProcessEnv {
    KINDE_DOMAIN: string;
    KINDE_CLIENT_ID: string;
    KINDE_CLIENT_SECRET: string;
    KINDE_REDIRECT_URI: string;
    KINDE_LOGOUT_REDIRECT_URI: string;
    POSTGRES_URL: string;
  }
}
