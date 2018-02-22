const winston = require('winston');

require('winston-papertrail').Papertrail;

const winstonPapertrail = new winston.transports.Papertrail({
  host: 'logs.papertrailapp.com',
  port: 45582
});

winstonPapertrail.on('error', function (err) {
  console.log('Winston failed to connect to papertrail: ' + err);
});

exports.logger = new winston.Logger({
  transports: [winstonPapertrail]
});