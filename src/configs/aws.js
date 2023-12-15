require("dotenv").config();
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const s3Client = new S3Client({
  region: process.env.BUCKET_REGION,
  endpoint: `https://${process.env.ENDPOINT_S3}`,
  credentials: {
    accessKeyId: process.env.BUCKET_KEY,
    secretAccessKey: process.env.BUCKET_APP_KEY
  }
});

const upload = async (originalname, buffer, mimetype) => {
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: originalname,
    Body: buffer,
    ContentType: mimetype
  };

  const command = new PutObjectCommand(params);

  await s3Client.send(command);
  return `https://${process.env.BUCKET_NAME}.${process.env.ENDPOINT_S3}/${originalname}`;
};

module.exports = { upload };
