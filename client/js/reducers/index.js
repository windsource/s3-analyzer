import { SET_LIST } from '../actions';

const buckets = (state = [], action) => {
  switch (action.type) {
    case SET_LIST:
      return action.list;
    default:
      return state;
  }
};

export default buckets;
