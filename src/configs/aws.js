require("dotenv").config();
const aws = require("aws-sdk");

const endpoint = new aws.Endpoint(process.env.ENDPOINT_S3);

const S3 = new aws.S3({
  endpoint,
  credentials: {
    accessKeyId: process.env.BUCKET_KEY,
    secretAccessKey: process.env.BUCKET_APP_KEY,
  },
});

const upload = async (originalname, buffer, mimetype) => {
  return S3.upload({
    Bucket: process.env.BUCKET_NAME,
    Key: originalname,
    Body: buffer,
    ContentType: mimetype,
  }).promise();
};

module.exports = { S3, upload };
