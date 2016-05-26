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

  it('should get the region of a bucket', (done) => {
    s3.getBucketRegion(newBucketName).then((res) => {
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

  it('should get size of bucket', function ires(done) {
    this.timeout(5000);
    s3.getBucketSize(newBucketName, (data) => {
      console.log(`Intermediate ${JSON.stringify(data)}`);
    }).then((res) => {
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
