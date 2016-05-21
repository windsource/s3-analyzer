import React, { PropTypes } from 'react';
import BucketRow from './BucketRow';

const BucketTable = ({ list }) => (
  <table className="table table-bordered">
    <thead><tr><th>Name</th></tr></thead>
    <tbody>{list.map((o) => (<BucketRow bucket={o} />))}</tbody>
  </table>
);

BucketTable.propTypes = {
  list: PropTypes.array.isRequired,
};

export default BucketTable;
