declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REFRESH_KEY: string;
      REFRESH_KEY_EXPIRES_IN: string;
      ACCESS_KEY: string;
      ACCESS_KEY_EXPIRES_IN: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
