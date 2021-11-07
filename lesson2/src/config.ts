import logger from './logger';

export const PORT = process.env.PORT || 3000;

logger.info(process.env)

process.on('uncaughtException', (error) => {
  logger.error('[uncaughtException]: ', error);
});

process.on('unhandledRejection', (error) => {
  logger.error('[uncaughtException]: ', error);
});
