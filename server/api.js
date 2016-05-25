'use strict';


const express = require('express');
const router = new express.Router();

const S3 = require('./s3.js');

router.use((req, res, next) => {
  // The following 2 lines are required in order for http://editor.swagger.io/ to work
  res.append('Access-Control-Allow-Origin', '*');
  res.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  console.log('Time: ', Date.now(), req.path);
  next();
});

router.get('/list', (req, res) => {
  const s3 = new S3();
  s3.listBuckets().then((bucketList) => {
    const resultList = [];
    for (const o of bucketList.Buckets) {
      resultList.push({ bucketName: o.Name });
    }
    res.json(resultList);
  }, (err) => {
    res.status(500).json(err);
  });
});

router.get('/region/:bucketName', (req, res) => {
  const s3 = new S3();
  s3.getBucketRegion(req.params.bucketName).then((region) => {
    res.json(region.region);
  }, (err) => {
    res.status(500).json(err);
  });
});

router.get('/size/:bucketName/:region', (req, res) => {
  const s3 = new S3(req.params.region);
  s3.getBucketSize(req.params.bucketName).then((bucketSize) => {
    res.json(bucketSize);
  }, (err) => {
    res.status(500).json(err);
  });
});

module.exports = router;

