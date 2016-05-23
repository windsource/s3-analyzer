import React, { PropTypes } from 'react';
import PleaseWait from './PleaseWait';

const BucketRow = ({ bucket, loadRegion }) => {
  let region = '';
  if (bucket.hasOwnProperty('regionReq')) {
    switch (bucket.regionReq) {
      case 'pending':
        region = <PleaseWait />;
        break;
      case 'success':
        region = bucket.region;
        break;
      default:
        region = 'get region has failed';
        break;
    }
  } else {
    loadRegion(bucket.bucketName);
  }

  return <tr><td>{bucket.bucketName}</td><td>{region}</td></tr>;
};

BucketRow.propTypes = {
  bucket: PropTypes.object.isRequired,
  loadRegion: PropTypes.func.isRequired,
};

export default BucketRow;
