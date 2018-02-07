const attachedFile = require('./helpers/attached-file');
const mail = require('./helpers/mail');
const recipients = require('./helpers/recipients');

const CronJob = require('cron').CronJob;

// Import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' });
console.log('===== Send That Invoice - started! =====');
mail.send({
  email: 'hello@dfjames.com',
  subject: 'Server Started!',
  text: 'Hey Dave,\n\nYour Server just started!\n\nCheers :D'
});

// Start the Cron
const job = new CronJob({
  cronTime: '00 00 * * * *', // Once every hour
  onTick: function(){
    console.log('🏄  Surfing the net for the invoice');
    sendInvoice();
  },
  start: false,
  timeZone: 'Australia/Melbourne'
});
job.start();

function sendInvoice() {
  const recipientList = recipients.getRecipientFiles('./data');
  recipientList.forEach(personFile => {
    if (personFile.includes('sample')) {
      return;
    }
    const recipient = require(personFile);
    const filePrefix = recipient['file-prefix'];
    let foundFilePath;

    // Get the file, email it then archive it!
    const sendInvoice = attachedFile.searchFilePath(filePrefix)
      .then(function (filePath){
        foundFilePath = filePath;
        const file = attachedFile.getFile(filePath);
        return file;
      })
      .then(function (file) {
        const mailPromise = mail.send({
          email: recipient.email,
          subject: recipient.subject,
          text: recipient.text,
          attachments: {   // binary buffer as an attachment
            filename: file.name,
            content: new Buffer(file.fileBinary, 'binary'),
            encoding: 'binary'
          }
        });
        return mailPromise;
      })
      .then(function () {
        console.log('The email was sent! 📤');
        const archiveFile = attachedFile.archiveFile(foundFilePath, recipient.name);
        return archiveFile;
      })
      .catch(function (error) {
        console.log(error);
        console.log('Email failed to send 🙃');
        return Promise.reject(error);
      });
  });
}
