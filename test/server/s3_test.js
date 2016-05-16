'use strict';

const S3 = require('../../server/s3.js');

describe('Testing S3', () => {
  let s3;
  const newBucketName = 'dum33mybxucketbgh555bjggajrghjarsfh';

  before(() => {
    s3 = new S3('eu-central-1');
  });

  it('should create a new bucket', (done) => {
    s3.createBucket(newBucketName).then(() => {
      done();
    }, done);
  });

  it('should list my buckets', (done) => {
    s3.listBuckets().then((res) => {
      console.log(res);
      done();
    }, done);
  });

  it('should list objects in bucket', (done) => {
    s3.listObjects(newBucketName).then((res) => {
      console.log(res);
      done();
    }, done);
  });

  it('should get size of bucket', (done) => {
    s3.getBucketSize(newBucketName).then((res) => {
      console.log(res);
      done();
    }, done);
  });

  it('should delete the new bucket', (done) => {
    s3.deleteBucket(newBucketName).then(() => {
      done();
    }, done);
  });

  after(() => {
  });
});
