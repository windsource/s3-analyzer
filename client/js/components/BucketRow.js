import React, { PropTypes } from 'react';

const BucketRow = ({ bucket }) => (
  <tr><td>{bucket.bucketName}</td><td>{bucket.region || 'nothing'}</td></tr>
);

BucketRow.propTypes = {
  bucket: PropTypes.object.isRequired,
};

export default BucketRow;
