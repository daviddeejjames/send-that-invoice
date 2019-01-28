const fs = require('fs');

exports.getRecipientFiles= dir => {
  let fileList = [];

  const files = fs.readdirSync(dir);
  for (const i in files) {
    if (!files.hasOwnProperty(i)) continue;
    const name = dir + '/' + files[i];
    if (!fs.statSync(name).isDirectory()) {
      fileList.push(name);
    }
  }
  return fileList;
};