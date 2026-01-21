import fs from 'fs';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import s3 from '../config/s3.js'; // Make sure this path points to your S3 config file

export const uploadPdfToS3 = async (filePath) => {
  try {
    const fileContent = fs.readFileSync(filePath);
    const fileName = `resumes/resume-${Date.now()}.pdf`;

    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,
      Body: fileContent,
      ContentType: 'application/pdf',
      // 'public-read' allows the user to open the link immediately
    //   ACL: 'public-read' 
    };

    const command = new PutObjectCommand(uploadParams);
    await s3.send(command);

    // Construct the public URL manually (AWS SDK v3 doesn't return it automatically)
    const publicUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

    // Clean up: Delete the local temp file after upload so Render disk doesn't fill up
    fs.unlinkSync(filePath);

    return publicUrl;
  } catch (error) {
    console.error("S3 Upload Error:", error);
    throw error;
  }
};