/* eslint arrow-body-style: ["off"] */
/* eslint prefer-template: ["off"] */
import fetch from 'isomorphic-fetch';

export const GET_LIST = 'GET_LIST';
export const GET_LIST_SUCCESS = 'GET_LIST_SUCCESS';
export const GET_LIST_FAILURE = 'GET_LIST_FAILURE';

export const getList = () => ({ type: GET_LIST });
export const getListSuccess = (list) => ({ type: GET_LIST_SUCCESS, list });
export const getListFailure = (err) => ({ type: GET_LIST_FAILURE, err });

export const GET_REGION = 'GET_REGION';
export const GET_REGION_SUCCESS = 'GET_REGION_SUCCESS';
export const GET_REGION_FAILURE = 'GET_REGION_FAILURE';

export const getRegion = (bucketName) => ({ type: GET_REGION, bucketName });
export const getRegionSuccess = (bucketName, region) => (
  {
    type: GET_REGION_SUCCESS,
    bucketName,
    region,
  });
export const getRegionFailure = (bucketName, err) => (
  {
    type: GET_REGION_FAILURE,
    bucketName,
    err,
  });

export const GET_SIZE = 'GET_SIZE';
export const GET_SIZE_SUCCESS = 'GET_SIZE_SUCCESS';
export const GET_SIZE_FAILURE = 'GET_SIZE_FAILURE';

export const getSize = (bucketName, size = { size: 0, count: 0 }) => (
  { type: GET_SIZE, bucketName, size }
);
export const getSizeSuccess = (bucketName, size) => (
  {
    type: GET_SIZE_SUCCESS,
    bucketName,
    size,
  });
export const getSizeFailure = (bucketName, err) => (
  {
    type: GET_SIZE_FAILURE,
    bucketName,
    err,
  });


export const retrieveRegion = (bucketName) => {
  return dispatch => {
    dispatch(getRegion(bucketName));
    let status = 0;
    return fetch(`/api/region/${bucketName}`)
      .then(response => { status = response.status; return response.json(); })
      .then(json => {
        if (status === 200) dispatch(getRegionSuccess(bucketName, json));
        else dispatch(getRegionFailure(bucketName, json));
      });
  };
};

export const retrieveList = () => {
  return dispatch => {
    dispatch(getList());
    let status = 0;
    return fetch('/api/list')
      .then(response => { status = response.status; return response.json(); })
      .then(json => {
        if (status === 200) {
          dispatch(getListSuccess(json));
          // For every bucket also load its region
          for (const o of json) {
            dispatch(retrieveRegion(o.bucketName));
          }
        } else dispatch(getListFailure(json));
      });
  };
};

export const retrieveSize = (bucketName, region) => {
  return dispatch => {
    dispatch(getSize(bucketName));
    let status = 0;
    return fetch(`/api/size/${bucketName}/${region}`)
      .then(response => { status = response.status; return response.json(); })
      .then(json => {
        if (status === 200) dispatch(getSizeSuccess(bucketName, json));
        else dispatch(getSizeFailure(bucketName, json));
      });
  };
};


export const retrieveSizeStream = (bucketName, region) => {
  return dispatch => {
    dispatch(getSize(bucketName));

    const port = location.port ? ':' + location.port : '';
    const url = `ws://${location.hostname}${port}/api/sizestream/${bucketName}/${region}`;
    const ws = new WebSocket(url);
    ws.onmessage = (evt) => {
      const msg = JSON.parse(evt.data);
      switch (msg.status) {
        case 'pending':
          dispatch(getSize(bucketName, msg.size));
          break;
        case 'success':
          dispatch(getSizeSuccess(bucketName, msg.size));
          break;
        default:
          dispatch(getSizeFailure(bucketName, msg.err));
          break;
      }
    };
  };
};
