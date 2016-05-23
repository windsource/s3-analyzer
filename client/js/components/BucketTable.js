import React, { PropTypes } from 'react';
import PleaseWait from './PleaseWait';
import BucketRow from './BucketRow';

const BucketTable = ({ list, loadRegion }) => {
  if (!list) {
    return <PleaseWait />;
  }
  return (
    <table className="table table-bordered">
      <thead><tr>
        <th>Name</th>
        <th>Region</th>
      </tr></thead>
      <tbody>{list.map((o) => (<BucketRow bucket={o} loadRegion={loadRegion} />))}</tbody>
    </table>
  );
};

BucketTable.propTypes = {
  list: PropTypes.array,
  loadRegion: PropTypes.func.isRequired,
};

export default BucketTable;
