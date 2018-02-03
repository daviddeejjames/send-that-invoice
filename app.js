const express = require('express');
const attachedFile = require('./helpers/attached-file');
const mail = require('./helpers/mail');

// Create our Express app
const app = express();

app.get('/', (req, res) => {
  res.send('Tap for mana!');
});

//TODO: Determine recipent based on file uploaded
const recipient = require('./data/accolade.json');
const filePrefix = recipient['file-prefix'];

// Get the file, email it then archive it!
const file = attachedFile.getFile(filePrefix)
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
    const archiveFile = attachedFile.archiveFile(filePrefix);
    return archiveFile;
  })
  .catch(function (error) {
    console.log('Email failed to send 🙃');
    console.log(error);
  });

// Export it so we can start the site in start.js
module.exports = app;