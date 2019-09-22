const Dropbox = require('dropbox');
const dbx = new Dropbox({ accessToken: process.env.DROPBOX_TOKEN });

/**
 * Moves the file to the sent folder.
 *
 * @param {String} path - the path of the file we are after
 */
const archiveFile = (path, recipient) => {
  const subFolderName = recipient.name;

  return dbx.filesMove({
    from_path: path,
    to_path: '/archived/' + subFolderName + path,
    allow_shared_folder: true,
    autorename: true,
    allow_ownership_transfer: true
  })
    .then(fileMove => {
      console.log('File ' + fileMove.name + ' archived successfully! 🗳️');
      return fileMove;
    })
    .catch(error => {
      console.log('Error archiving the file 💥');
      return Promise.reject(error);
    });
};

module.exports = archiveFile;