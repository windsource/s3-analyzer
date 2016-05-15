'use strict';

const S3 = require('../src/s3.js');

describe('Testing S3', () => {
  let s3;
  const newBucketName = 'dummybxucketbghbjgrjgajrghjarsfh';

  before(() => {
    s3 = new S3('eu-west-1');
  });

  it('should create a new bucket', (done) => {
    s3.createBucket(newBucketName).then(() => {
      done();
    });
  });

  it('should list my buckets', (done) => {
    s3.listBuckets().then((res) => {
      console.log(res);
      done();
    });
  });

  it('should delete the new bucket', (done) => {
    s3.deleteBucket(newBucketName).then(() => {
      done();
    });
  });

  after(() => {
  });
});
