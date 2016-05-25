import React, { PropTypes } from 'react';
import PleaseWait from './PleaseWait';
import BucketRow from './BucketRow';

const BucketTable = ({ list, loadSize }) => {
  if (!list) {
    return <PleaseWait />;
  }
  return (
    <table className="table table-bordered">
      <thead><tr>
        <th>Name</th>
        <th>Region</th>
        <th>Size</th>
      </tr></thead>
      <tbody>
      {list.map((o) => (<BucketRow bucket={o} loadSize={loadSize} />))}
      </tbody>
    </table>
  );
};

BucketTable.propTypes = {
  list: PropTypes.array,
  loadSize: PropTypes.func.isRequired,
};

export default BucketTable;
