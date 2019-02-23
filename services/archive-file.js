const Dropbox = require('dropbox');
const dbx = new Dropbox({ accessToken: process.env.ACCESS_TOKEN });
const logger = require('../helpers/logger');

/**
 * Moves the file to the sent folder.
 *
 * @param {String} path - the path of the file we are after
 */
const archiveFile = async (path, recipient) => {
  const subFolderName = recipient.name;

  return await dbx.filesMove({
    from_path: path,
    to_path: '/archived/' + subFolderName + path,
    allow_shared_folder: true,
    autorename: true,
    allow_ownership_transfer: true
  })
    .then(fileMove => {
      logger.info('File ' + fileMove.name + ' archived successfully! 🗳️');
      return fileMove;
    })
    .catch(error => {
      logger.info('Error archiving the file 💥');
      return Promise.reject(error);
    });
};

module.exports = archiveFile;