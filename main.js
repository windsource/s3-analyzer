'use strict';

// Comand line interface
// For test purpose only. Prefer using the web ui

const pretty = require('prettysize');

const S3 = require('./server/s3.js');

if (process.argv.length < 4) {
  console.log('Usage: node main <region> <bucketName>');
  console.log('Get the size of an AWS S3 bucket.');
  console.log('Example: node start eu-central-1 mybucket\n');
  process.exit(1);
}

const region = process.argv[2];
const bucketName = process.argv[3];


const s3 = new S3(region);

s3.getBucketSize(bucketName).then((res) => {
  console.log(pretty(res));
}, console.error);
