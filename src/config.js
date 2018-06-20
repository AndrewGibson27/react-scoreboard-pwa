import dotenv from 'dotenv';

dotenv.config();

const config = {
  isDev: process.env.NODE_ENV === 'development',
  port: process.env.PORT || 3000,
  db: {
    host: process.env.DB_HOST,
  },
};

export default config;
