const Dropbox = require('dropbox');
const dbx = new Dropbox({ accessToken: process.env.ACCESS_TOKEN });

console.log('Dropbox is life');

/**
 *
 * @param {Array} entries - File entries found from Dropbox API
 * @param {String} filePrefix - the prefix of the file we are after
 */
function searchFilePath(entries, filePrefix) {
  if (entries && filePrefix) {
    let foundPath;
    entries.forEach(element => {
      if (element.name.startsWith(filePrefix)) {
        foundPath = element.path_display; // Note: only works with one file of that name
      }
    });

    // We found the file!
    if(foundPath) {
      console.log('Found the file! 🧙');
      return foundPath;
    }

    // Couldn't find the file
    console.log('No files were found! ❓');
    return;
  }
}

/**
 * Gets the desired file from Dropbox
 *
 * @param {String} filePrefix - the prefix of the file we are after
 */
exports.getFile = function (filePrefix) {

  const file = dbx.filesListFolder({path: ''})
    .then(function (response) {
      return searchFilePath(response.entries, filePrefix);
    })
    .then(function (path) {
      const fileResponse = dbx.filesDownload({ path: path });
      return fileResponse;
    })
    .then(function (fileResponse) {
      return fileResponse;
    })
    .catch(function (error) {
      if ( error.status != 400 ) {
        console.log('Error retrieving the file from Dropbox 🛑');
        console.log(error);
      }
    });

  return file;
};

/**
 * Moves the file to the sent folder.
 *
 * @param {*} filePrefix - the prefix of the file we are after
 */
exports.archiveFile = function (filePrefix) {
  const renamedFile = dbx.filesListFolder({ path: '' })
    .then(function (response) {
      return searchFilePath(response.entries, filePrefix);
    })
    .then(function (path) {
      const fileMove = dbx.filesMove({
        from_path: path,
        to_path: '/sent' + path,
        allow_shared_folder: true,
        autorename: true,
        allow_ownership_transfer: true
      });
      return fileMove;
    })
    .then(function (fileMove) {
      console.log('File archived successfully! 🗳️');
      return fileMove;
    })
    .catch(function (error) {
      console.log('Error moving the file on Dropbox 💥');
      console.log(error);
    });

  return renamedFile;
};