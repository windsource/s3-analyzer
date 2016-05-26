import React from 'react';

const PleaseWait = () => {
  const style = {
    fontSize: '18px',
    marginRight: '18px',
  };
  return <i className="fa fa-spinner fa-spin" style={style}></i>;
};

export default PleaseWait;
