import dotenv from 'dotenv';
import { SignOptions } from 'jsonwebtoken';

dotenv.config();

interface Config {
  nodeEnv: string;
  port: number;
  databaseUrl: string;
  jwtSecret: string;
  jwtExpiresIn: Exclude<SignOptions['expiresIn'], undefined>;
  corsOrigin: string;
}

const config: Config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '5000', 10),
  databaseUrl: process.env.DATABASE_URL || '',
  jwtSecret: process.env.JWT_SECRET || (() => { throw new Error("JWT_SECRET missing"); })(),
  jwtExpiresIn: (process.env.JWT_EXPIRES_IN || '7d') as Exclude<SignOptions['expiresIn'], undefined>,
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
};

export default config;
