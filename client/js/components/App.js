import React from 'react';
import DynBucketTable from '../containers/DynBucketTable';

const App = () => (
  <div>
    <h1>Available AWS S3 buckets</h1>
    <DynBucketTable />
  </div>
);

export default App;
