import { GET_LIST, GET_LIST_FAILURE, GET_LIST_SUCCESS,
 GET_REGION, GET_REGION_FAILURE, GET_REGION_SUCCESS } from '../actions';

const buckets = (state = [], action) => {
  switch (action.type) {
    case GET_LIST:
      return { listReq: 'pending' };
    case GET_LIST_SUCCESS:
      return { listReq: 'success', list: action.list };
    case GET_LIST_FAILURE:
      return { listReq: 'failure', listErr: action.err };
    case GET_REGION: {
      if (!state.list) return state;
      const list = state.list.map((o) => {
        if (o.bucketName === action.bucketName) {
          return Object.assign({}, o, { regionReq: 'pending' });
        }
        return o;
      });
      return Object.assign({}, state, { list });
    }
    case GET_REGION_SUCCESS: {
      if (!state.list) return state;
      const list = state.list.map((o) => {
        if (o.bucketName === action.bucketName) {
          return Object.assign({}, o, { regionReq: 'success', region: action.region });
        }
        return o;
      });
      return Object.assign({}, state, { list });
    }
    case GET_REGION_FAILURE: {
      if (!state.list) return state;
      const list = state.list.map((o) => {
        if (o.bucketName === action.bucketName) {
          return Object.assign({}, o, { regionReq: 'success', regionErr: action.err });
        }
        return o;
      });
      return Object.assign({}, state, { list });
    }
    default:
      return state;
  }
};

export default buckets;
