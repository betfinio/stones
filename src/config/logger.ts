import { createConsola } from 'consola/browser';

const logger = createConsola({}).withTag('stones');

logger.wrapConsole();

export default logger;
