/* eslint arrow-body-style: ["off"] */
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

export const retrieveList = () => {
  return dispatch => {
    dispatch(getList());
    return fetch('/api/list')
      .then(response => response.json())
      .then(json => dispatch(getListSuccess(json)));
  };
};

export const retrieveRegion = (bucketName) => {
  return dispatch => {
    dispatch(getRegion(bucketName));
    return fetch(`/api/region/${bucketName}`)
      .then(response => response.json())
      .then(json => dispatch(getRegionSuccess(bucketName, json)));
  };
};
