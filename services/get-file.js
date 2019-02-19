const Dropbox = require('dropbox');
const dbx = new Dropbox({ accessToken: process.env.ACCESS_TOKEN });
const logger = require('./logger').logger;

/**
 * Gets the desired file from Dropbox
 *
 * @param {String} path - the path of the file we are after
 */
async function getFile(filePath) {
  const file = dbx.filesDownload({ path: filePath })
    .then(response => {
      return response;
    })
    .catch(error => {
      logger.info('Error downloading the file ❎');
      return Promise.reject(error);
    });

  return file;
}

export default getFile;