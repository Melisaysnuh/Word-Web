declare global {
    namespace NodeJS {
        interface ProcessEnv {
            API_BASE_URL: string;
            API_KEY: string;
            NODE_ENV?: 'development' | 'production';
            PORT?: string;

        }
    }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export { }