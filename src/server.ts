import app from './app';
import config from './config';
import logger from './utils/logger';
import { connectDatabase } from './config/database';

async function startServer() {
  try {
    // Test database connection
    await connectDatabase();
    logger.info('Database connected successfully');

    // Start server
    app.listen(config.port, () => {
      logger.info(`Server running on port ${config.port}`);
      logger.info(`Environment: ${config.nodeEnv}`);
      logger.info(`API Documentation: http://localhost:${config.port}/api-docs`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();