export default {
  DATABASE_URL: process.env.DATABASE_URL || '',
  DB: {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    PASS: process.env.DB_PASS,
    PORT: process.env.DB_PORT || 3306,
    NAME: process.env.DB_NAME
  },
  MODE: process.env.MODE || 'development',
  MICROSOFT: {
    APP_CLIENT_ID: process.env.MICROSOFT_APP_CLIENT_ID,
    CLIENT_SECRET: process.env.MICROSOFT_CLIENT_SECRET,
    SECRET_ID: process.env.MICROSOFT_SECRET_ID,
    TENANT_ID: process.env.MICROSOFT_TENANT_ID,
    MEETING_ID: process.env.MICROSOFT_MEETING_ID
  },
  PORT: process.env.PORT && parseInt(process.env.PORT) || 3010,
  REQUIRED_VARIABLES: [],
  RETRY_AFTER_HEADER: process.env.RETRY_AFTER_HEADER || 2 * 60 * 60,
  SERVICES: {
    DB: 'Database'
  },
  VIMEO: {
    CLIENT_ID: process.env.VIMEO_CLIENT_ID,
    CLIENT_SECRET: process.env.VIMEO_CLIENT_SECRET,
    ACCESS_TOKEN: process.env.VIMEO_ACCESS_TOKEN
  }
}
