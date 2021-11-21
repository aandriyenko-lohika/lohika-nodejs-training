import logger from './logger';

process.on('uncaughtException', (error) => {
  logger.error('[uncaughtException]: ', error);
});

process.on('unhandledRejection', (error) => {
  logger.error('[unhandledRejection]: ', error);
});
