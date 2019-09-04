const winston = require('winston');

require('winston-papertrail').Papertrail;

const winstonPapertrail = new winston.transports.Papertrail({
  host: 'logs.papertrailapp.com',
  port: 45582
});

winstonPapertrail.on('error', error => {
  logger.info('Winston failed to connect to papertrail: ' + error);
});

const logger = new winston.Logger({
  transports: [winstonPapertrail]
});

module.exports = logger;