import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
 
@Injectable()
export class UploadFileService {
 
  FOLDER = 'classProject/';
 
  constructor() { }
 
  uploadfile(file) {
 
    const bucket = new S3(
      {
        accessKeyId: '',
        secretAccessKey: '',
        region: 'us-east-2'
      }
    );
 
    const params = {
      Bucket: 'mortgage-calc',
      Key: this.FOLDER + file.name,
      Body: file,
      ACL: 'public-read'
    };
 
    bucket.upload(params, function (err, data) {
      if (err) {
        console.log('There was an error uploading your file: ', err);
        return false;
      }
 
      console.log('Successfully uploaded file.', data);
      return true;
    });
  }
 
}