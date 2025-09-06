const AWS = require("aws-sdk");

// Configure AWS S3 with credentials from environment variables
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

/**
 * Upload a single file buffer to AWS S3
 */
const uploadMediaToS3 = async (file) => {
  try {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `uploads/${Date.now()}-${file.originalname}`, // Unique file name
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const result = await s3.upload(params).promise();
    return result; // Returns { Location, Key, Bucket }
  } catch (error) {
    console.error("S3 Upload Error:", error);
    throw new Error("Error uploading file to S3");
  }
};

/**
 * Delete a file from AWS S3 by key
 */
const deleteMediaFromS3 = async (key) => {
  try {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
    };

    await s3.deleteObject(params).promise();
    return true;
  } catch (error) {
    console.error("S3 Delete Error:", error);
    throw new Error("Error deleting file from S3");
  }
};

module.exports = {
  uploadMediaToS3,
  deleteMediaFromS3,
};
