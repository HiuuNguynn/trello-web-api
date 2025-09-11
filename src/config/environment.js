import 'dotenv/config'

export const env = {
  APP_HOST: process.env.APP_HOST,
  APP_PORT: process.env.APP_PORT,
  AUTHOR: process.env.AUTHOR,
  
  BUILD_MODE: process.env.BUILD_MODE,

  DATABASE_NAME: process.env.DATABASE_NAME,
  
  MONGODB_URI: process.env.MONGODB_URI
}
