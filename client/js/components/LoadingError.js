import React from 'react';

const LoadingError = (err) => (
  <div>Error: {JSON.stringify(err)}</div>
);

LoadingError.propTypes = {
  err: React.PropTypes.object.isRequired,
};

export default LoadingError;
