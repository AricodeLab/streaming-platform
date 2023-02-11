import * as dotenv from 'dotenv';
dotenv.config();

console.log(process.env.JWT_SECRET)
export default {
    JWT_SECRET : process.env.JWT_SECRET,
    JWT_EXPIRATION: process.env.JWT_EXPIRATION
  };
  