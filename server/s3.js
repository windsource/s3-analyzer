'use strict';

const AWS = require('aws-sdk');

class S3 {
  /**
   * Create a new object to work with AWS S3.
   * @param {string} region AWS region like 'eu-west-1', 'eu-central-1', etc.
   */
  constructor(region) {
    this.region = region || 'eu-west-1';
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
   * Get the region a bucket is stored in
   * @param {string} name of the bucket
   * @returns {Promise} that returns the AWS output.
   */
  getBucketRegion(name) {
    return new Promise((fulfill, reject) => {
      const params = {
        Bucket: name,
      };
      this.s3.getBucketLocation(params, (err, data) => {
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
   * @returns {Promise} that returns the size and number of objects.
   */
  getBucketSize(bucketName) {
    const start = new Date();
    return new Promise((fulfill, reject) => {
      this._calcBucketSize(bucketName, null, null, (err, data) => {
        if (err) reject(err);
        else {
          const res = data;
          if (res) {
            res.executionTime = new Date() - start;
          }
          fulfill(data);
        }
      });
    });
  }

  _calcBucketSize(bucketName, prev, continuationToken, callback) {
    const now = prev || { size: 0, count: 0 };
    this.listObjects(bucketName, continuationToken).then((listRes) => {
      for (const o of listRes.Contents) {
        now.size += o.Size;
        now.count++;
      }
      if (listRes.hasOwnProperty('NextContinuationToken')) {
        this._calcBucketSize(bucketName, now, listRes.NextContinuationToken, callback);
      } else {
        callback(null, now);
      }
    }, (err) => {
      callback(err);
    });
  }

}

module.exports = S3;
