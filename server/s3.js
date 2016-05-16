'use strict';

const AWS = require('aws-sdk');

class S3 {
  /**
   * Create a new object to work with AWS S3.
   * @param {string} region AWS region like 'eu-west-1', 'eu-central-1', etc.
   */
  constructor(region) {
    this.region = region;
    if (this.region === 'eu-central-1') {
      AWS.config.update({ region: this.region, signatureVersion: 'v4' });
      const ep = new AWS.Endpoint('s3.eu-central-1.amazonaws.com');
      this.s3 = new AWS.S3({ endpoint: ep });
    } else {
      AWS.config.update({ region: this.region });
      this.s3 = new AWS.S3();
    }
  }

  /**
   * List all the buckets
   * @returns {Promise} that returns the AWS output.
   */
  listBuckets() {
    return new Promise((fulfill, reject) => {
      this.s3.listBuckets((err, data) => {
        if (err) reject(err);
        else fulfill(data);
      });
    });
  }

  /**
   * Create a new bucket
   * @param {string} name of the bucket
   * @returns {Promise} that returns the AWS output.
   */
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

  /**
   * Delete an existing bucket
   * @param {string} name of the bucket
   * @returns {Promise} that returns the AWS output.
   */
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

  /**
   * List the objects in a bucket
   * @param {string} bucketName name of the bucket
   * @param {string} continuationToken used from previous request to get the remaining objects
   * @returns {Promise} that returns the AWS output.
   */
  listObjects(bucketName, continuationToken) {
    return new Promise((fulfill, reject) => {
      const params = {
        Bucket: bucketName,
        ContinuationToken: continuationToken,
        MaxKeys: 1000,
      };
      this.s3.listObjectsV2(params, (err, data) => {
        if (err) reject(err);
        else fulfill(data);
      });
    });
  }

  /**
   * Get the size of a bucket (i.e. the sum of all objects' size in that bucket)
   * @param {string} bucketName name of the bucket
   * @returns {Promise} that returns the size.
   */
  getBucketSize(bucketName) {
    return this._calcBucketSize(bucketName);
  }

  _calcBucketSize(bucketName, prevSize, continuationToken) {
    return new Promise((fulfill, reject) => {
      let size = prevSize || 0;
      this.listObjects(bucketName, continuationToken).then((listRes) => {
        for (const o of listRes.Contents) {
          size += o.Size;
        }
        if (listRes.hasOwnProperty('NextContinuationToken')) {
          this._calcBucketSize(bucketName, size, listRes.NextContinuationToken).then((calcRes) => {
            fulfill(calcRes);
          }, (err) => {
            reject(err);
          });
        } else {
          // size calculation is finished
          fulfill(size);
        }
      }, (err) => {
        reject(err);
      });
    });
  }

}

module.exports = S3;