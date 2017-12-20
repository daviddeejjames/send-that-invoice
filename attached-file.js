const Dropbox = require('dropbox');
const dbx = new Dropbox({ accessToken: process.env.ACCESS_TOKEN });

console.log('Dropbox is life');

exports.getFile =  function() {

  const path = dbx.filesListFolder({path: ''})
    .then(function (response) {
      console.log(response.entries[0]);
      return response.entries[0]; // Returns the first entry, but we could do this better tbh
    })
    .catch(function (error) {
      console.log(error);
    });

  // const file =  dbx.filesDownload({ path: path })
};