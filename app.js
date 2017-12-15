const express = require('express');

// Create our Express app
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// TODO: Pull from environment variables
// mail.send({
//   email: 'fake@email.com
//   subject: 'Password Rest',
// });

// Export it so we can start the site in start.js
module.exports = app;