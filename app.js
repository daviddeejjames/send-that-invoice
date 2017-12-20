const express = require('express');
const attachedFile = require('./attached-file');
// Create our Express app
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const file = attachedFile.getFile();

// mail.send({
//   email: 'fake@email.com,
//   subject: 'Password Rest'
// });

// Export it so we can start the site in start.js
module.exports = app;