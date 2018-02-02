const Dropbox = require('dropbox');
const dbx = new Dropbox({ accessToken: process.env.ACCESS_TOKEN });

console.log('Dropbox is life');

exports.getFile = function() {

  const file = dbx.filesListFolder({path: ''})
    .then(function (response) {
      //TODO: Logic that determines latest file only
      const path = response.entries[0].path_lower;
      return path;
    })
    .then(function (path) {
      const fileResponse = dbx.filesDownload({ path: path });
      return fileResponse;
    })
    .then(function (fileResponse) {
      return fileResponse.fileBinary;
    })
    .catch(function (error) {
      console.log(error);
    });

  return file;
};