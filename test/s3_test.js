"use strict";

const S3 = require('../src/s3.js');

describe('Testing S3', () => {

  let s3;
  const newBucketName = "dummybxucketbghbjgrjgajrghjarsfh";

  before(function () {
    s3 = new S3("eu-west-1");
  });

  it('should create a new bucket', (done) => {
    s3.createBucket(newBucketName, () => {
      done();
    });
  });

  it('should list my buckets', (done) => {
    s3.listBuckets( () => {
      done();
    });
  });

  it('should delete the new bucket', (done) => {
    s3.deleteBucket(newBucketName, () => {
      done();
    });
  });

  after(function () {
  });
});
