const Dropbox = require('dropbox');
const dbx = new Dropbox({ accessToken: process.env.ACCESS_TOKEN });

console.log('Dropbox is life');

function searchFilePath(entries, filePrefix) {
  if (entries && filePrefix) {
    let foundPath;
    entries.forEach(element => {
      if (element.name.startsWith(filePrefix)) {
        foundPath = element.path_display;
      }
    });

    if(foundPath) {
      console.log('Found the file! 🧙');
      return foundPath;
    }

    console.log('No files were found! ❓');
    return;
  }

}

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