"use strict";

let AWS = require('aws-sdk');

class S3 {
  constructor(region) {
    this.region = region;
    this.s3 = new AWS.S3();
  }

  listBuckets(done) {
    this.s3.listBuckets( (err,data) => {
      console.log("eins");
      if (err) {
        console.log(err, err.stack);
        done();
      } else {
        console.log(data);
        done();
      }
    });
  }

  createBucket(name, done) {
    let params = {
      Bucket: name,
      CreateBucketConfiguration: {
        LocationConstraint: this.region
      }
    };
    this.s3.createBucket(params, (err, data) => {
      if (err) {
        console.log(err, err.stack);
        done();
      }
      else {
        console.log(data);
        done();
      }
    });
  }

  deleteBucket(name, done) {
    let params = {
      Bucket: name,
    };
    this.s3.deleteBucket(params, (err, data) => {
      if (err) {
        console.log(err, err.stack);
        done();
      }
      else {
        console.log(data);
        done();
      }
    });
  }

}

module.exports = S3;
