const Dropbox = require('dropbox');
const dbx = new Dropbox({ accessToken: process.env.DROPBOX_TOKEN });

/**
 * Gets the desired file from Dropbox
 *
 * @param {String} path - the path of the file we are after
 */
const getFile = filePath => {
  const file = dbx.filesDownload({ path: filePath })
    .then(response => {
      return response;
    })
    .catch(error => {
      console.log('Error downloading the file ❎');
      return Promise.reject(error);
    });

  return file;
};

module.exports = getFile;