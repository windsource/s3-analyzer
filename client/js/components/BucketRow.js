import React, { PropTypes } from 'react';
import PleaseWait from './PleaseWait';
import LoadingError from './LoadingError';
import pretty from 'prettysize';


const numberWithCommas = (x) => (
    x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
);

const getRegion = (bucket) => {
  if (bucket.hasOwnProperty('regionReq')) {
    switch (bucket.regionReq) {
      case 'pending':
        return <PleaseWait />;
      case 'success':
        return bucket.region;
      default:
        return <LoadingError err={bucket.regionErr} />;
    }
  }
  return '';
};

const getSize = (bucket, loadSize) => {
  let size = '';
  if (bucket.hasOwnProperty('regionReq') && bucket.regionReq === 'success') {
    if (bucket.hasOwnProperty('sizeReq')) {
      if (bucket.sizeReq === 'failure') {
        size = <LoadingError err={bucket.sizeErr} />;
      } else {
        if (bucket.sizeReq === 'pending') {
          size = <PleaseWait />;
        }
        size = <span>{size}{`${pretty(bucket.size.size)}, ${numberWithCommas(bucket.size.count)} objects`}</span>;
      }
    } else {
      size = (<button
        type="button"
        className="btn btn-default btn-sm"
        onClick={() => loadSize(bucket.bucketName, bucket.region)}
      >Get values</button>);
    }
  }
  return size;  
}

const BucketRow = ({ bucket, loadSize }) => {
  let region = getRegion(bucket);
  let size = getSize(bucket, loadSize);

  return <tr><td>{bucket.bucketName}</td><td>{region}</td><td>{size}</td></tr>;
};


BucketRow.propTypes = {
  bucket: PropTypes.object.isRequired,
  loadSize: PropTypes.func.isRequired,
};

export default BucketRow;
