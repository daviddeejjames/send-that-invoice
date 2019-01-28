const Dropbox = require('dropbox');
const dbx = new Dropbox({ accessToken: process.env.ACCESS_TOKEN });
const logger = require('./logger').logger;
/**
 * Searches for a file based on the file prefix and returns
 * the file path if found.
 *
 * @param {Array} entries - File entries found from Dropbox API
 * @param {String} filePrefix - the prefix of the file we are after
 */
exports.searchFilePath = filePrefix => {
  const filePath = dbx.filesListFolder({ path: '' })
    .then(response => {
      let filePath;

      const entries = response.entries;
      entries.forEach(element => {
        if (element.name.toLowerCase().startsWith(filePrefix.toLowerCase())) {
          filePath = element.path_display; // Note: only works with one file of that name
        }
      });

      if(filePath) {
        return filePath;
      } else {
        throw new Error('No files were found! 😞');
      }

    })
    .then(foundPath => {
      logger.info('Found the file @' + foundPath  + ' 🧙 ' );
      return foundPath;
    })
    .catch(error => {
      return Promise.reject(error);
    });

  return filePath;
};

/**
 * Gets the desired file from Dropbox
 *
 * @param {String} path - the path of the file we are after
 */
exports.getFile = path => {

  const file = dbx.filesDownload({ path: path })
    .then(response => {
      return response;
    })
    .catch(error => {
      logger.info('Error downloading the file ❎');
      return Promise.reject(error);
    });

  return file;
};

/**
 * Moves the file to the sent folder.
 *
 * @param {String} path - the path of the file we are after
 */
exports.archiveFile = (path, subFolderName) => {
  const archivedFile = dbx.filesMove({
    from_path: path,
    to_path: '/sent/' + subFolderName + path,
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

  return archivedFile;
};