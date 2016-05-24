import React, { PropTypes } from 'react';
import PleaseWait from './PleaseWait';
import LoadingError from './LoadingError';
import pretty from 'prettysize';


const BucketRow = ({ bucket, loadRegion, loadSize }) => {
  let region = '';
  let size = '';
  if (bucket.hasOwnProperty('regionReq')) {
    switch (bucket.regionReq) {
      case 'pending':
        region = <PleaseWait />;
        break;
      case 'success': {
        region = bucket.region;
        if (bucket.hasOwnProperty('sizeReq')) {
          if (bucket.sizeReq === 'pending') size = <PleaseWait />;
          else if (bucket.sizeReq === 'failure') size = <LoadingError err={bucket.sizeErr} />;
          else size = pretty(bucket.size.size);
        } else {
          size = (<button
            type="button"
            className="btn btn-default btn-sm"
            onClick={() => loadSize(bucket.bucketName, region)}
          >Calculate size</button>);
        }
        break;
      }
      default:
        region = <LoadingError err={bucket.regionErr} />;
        break;
    }
  } else {
    loadRegion(bucket.bucketName);
  }

  return <tr><td>{bucket.bucketName}</td><td>{region}</td><td>{size}</td></tr>;
};

BucketRow.propTypes = {
  bucket: PropTypes.object.isRequired,
  loadRegion: PropTypes.func.isRequired,
  loadSize: PropTypes.func.isRequired,
};

export default BucketRow;
