'use strict';


const AWS = require('aws-sdk');

class S3 {
  constructor(region) {
    this.region = region;
    this.s3 = new AWS.S3();
  }

  listBuckets() {
    return new Promise((fulfill, reject) => {
      this.s3.listBuckets((err, data) => {
        if (err) reject(err);
        else fulfill(data);
      });
    });
  }

  createBucket(name) {
    return new Promise((fulfill, reject) => {
      const params = {
        Bucket: name,
        CreateBucketConfiguration: {
          LocationConstraint: this.region,
        },
      };
      this.s3.createBucket(params, (err, data) => {
        if (err) reject(err);
        else fulfill(data);
      });
    });
  }

  deleteBucket(name) {
    return new Promise((fulfill, reject) => {
      const params = {
        Bucket: name,
      };
      this.s3.deleteBucket(params, (err, data) => {
        if (err) reject(err);
        else fulfill(data);
      });
    });
  }

}

module.exports = S3;
