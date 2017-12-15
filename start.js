// Make sure we are running node 7.6+
const [major, minor] = process.versions.node.split('.').map(parseFloat);
if (major < 7 || (major === 7 && minor <= 5)) {
  // eslint-disable-next-line no-console
  console.log('🛑 You\'re on an older version of node that doesn\'t support the amazing thangs like Async + Await! Please go to nodejs.org and download version 7.6 or greater. \n ');
  process.exit();
}

// Import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' });

// Start our app!
const app = require('./app');
app.set('port', process.env.PORT || 3333 );
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`); // eslint-disable-line no-console
});