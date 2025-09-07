import { PrismaClient } from '@prisma/client';
import logger from '../utils/logger';

type PrismaLogEvent = {
  timestamp: Date;
  message: string;
  target: string;
};

const prisma = new PrismaClient({
  log: [
    { emit: 'event', level: 'query' },
    { emit: 'event', level: 'error' },
    { emit: 'event', level: 'info' },
    { emit: 'event', level: 'warn' },
  ],
});

prisma.$on('error', (e: PrismaLogEvent) => {
  logger.error('Prisma error:', e);
});

prisma.$on('warn', (e: PrismaLogEvent) => {
  logger.warn('Prisma warning:', e);
});

prisma.$on('info', (e: PrismaLogEvent) => {
  logger.info('Prisma info:', e);
});

export async function connectDatabase() {
  try {
    await prisma.$connect();
    logger.info('Connected to database');
  } catch (error) {
    logger.error('Database connection failed:', error);
    throw error;
  }
}

export async function disconnectDatabase() {
  try {
    await prisma.$disconnect();
    logger.info('Disconnected from database');
  } catch (error) {
    logger.error('Database disconnection failed:', error);
    throw error;
  }
}

export { prisma };
