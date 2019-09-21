const AWS = require('aws-sdk');
AWS.config.update({ region: 'ap-southeast-2' });
const s3 = new AWS.S3();

const getListOfS3Files = bucket => {
  return s3.listObjects(bucket).promise();
};

const getFileObjectsFromS3 = (bucketName, fileList) =>
  fileList.Contents.map(file => {
    const getParams = {
      Bucket: bucketName,
      Key: file.Key
    };
    return s3.getObject(getParams).promise();
  });

const getRecipientFiles = async bucket => {
  const fileList = await getListOfS3Files({ Bucket: bucket });
  const fileBinaries = await Promise.all(getFileObjectsFromS3(bucket, fileList));
  const files = fileBinaries.map(file => JSON.parse(file.Body.toString()));
  return files;
};

module.exports = getRecipientFiles;
