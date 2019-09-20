const Dropbox = require('dropbox');
const dbx = new Dropbox({ accessToken: process.env.DROPBOX_TOKEN });

/**
 * Searches for a file based on the file prefix and returns
 * the file path if found.
 *
 * @param {Array} entries - File entries found from Dropbox API
 * @param {String} filePrefix - the prefix of the file we are after
 */
const getFilePath = async filePrefix => {
  return await dbx
    .filesListFolder({ path: '' })
    .then(response => {
      let filePath;

      const entries = response.entries;
      entries.forEach(element => {
        if (element.name.toLowerCase().startsWith(filePrefix.toLowerCase())) {
          filePath = element.path_display; // Note: only works with one file of that name
        }
      });

      if (filePath) {
        return filePath;
      } else {
        throw new Error('No files were found! 😞');
      }
    })
    .then(foundPath => {
      console.info('Found the file @' + foundPath + ' 🧙 ');
      return foundPath;
    })
    .catch(error => {
      return Promise.reject(error);
    });
};

module.exports = getFilePath;
