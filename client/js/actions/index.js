/* eslint arrow-body-style: ["off"] */
import fetch from 'isomorphic-fetch';

export const SET_LIST = 'SET_LIST';

export const setList = (list) => (
  {
    type: SET_LIST,
    list,
  }
);

export const retrieveList = () => {
  console.log('start');
  return dispatch => {
    console.log('start2');
    // dispatch(requestPosts(subreddit))
    return fetch('/api/list')
      .then(response => response.json())
      .then(json => dispatch(setList(json)));
  };
};
