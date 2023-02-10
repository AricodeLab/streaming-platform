import * as dotenv from 'dotenv';
dotenv.config();
export default {
  DB_HOST: process.env.DB_HOST || 'db',
  DB_PORT: process.env.DB_PORT || 5432,
  DB_USERNAME: process.env.DB_USERNAME || 'postgres',
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME || 'nestjs',
  };
