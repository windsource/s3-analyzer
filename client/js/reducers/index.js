import * as types from '../actions';

const buckets = (state = {}, action) => {
  switch (action.type) {
    case types.GET_LIST:
      return { listReq: 'pending' };
    case types.GET_LIST_SUCCESS:
      return { listReq: 'success', list: action.list };
    case types.GET_LIST_FAILURE:
      return { listReq: 'failure', listErr: action.err };
    case types.GET_REGION: {
      if (!state.list) return state;
      const list = state.list.map((o) => {
        if (o.bucketName === action.bucketName) {
          return Object.assign({}, o, { regionReq: 'pending' });
        }
        return o;
      });
      return Object.assign({}, state, { list });
    }
    case types.GET_REGION_SUCCESS: {
      if (!state.list) return state;
      const list = state.list.map((o) => {
        if (o.bucketName === action.bucketName) {
          return Object.assign({}, o, { regionReq: 'success', region: action.region });
        }
        return o;
      });
      return Object.assign({}, state, { list });
    }
    case types.GET_REGION_FAILURE: {
      if (!state.list) return state;
      const list = state.list.map((o) => {
        if (o.bucketName === action.bucketName) {
          return Object.assign({}, o, { regionReq: 'failure', regionErr: action.err });
        }
        return o;
      });
      return Object.assign({}, state, { list });
    }

    case types.GET_SIZE: {
      if (!state.list) return state;
      const list = state.list.map((o) => {
        if (o.bucketName === action.bucketName) {
          return Object.assign({}, o, { sizeReq: 'pending', size: action.size });
        }
        return o;
      });
      return Object.assign({}, state, { list });
    }
    case types.GET_SIZE_SUCCESS: {
      if (!state.list) return state;
      const list = state.list.map((o) => {
        if (o.bucketName === action.bucketName) {
          return Object.assign({}, o, { sizeReq: 'success', size: action.size });
        }
        return o;
      });
      return Object.assign({}, state, { list });
    }
    case types.GET_SIZE_FAILURE: {
      if (!state.list) return state;
      const list = state.list.map((o) => {
        if (o.bucketName === action.bucketName) {
          return Object.assign({}, o, { sizeReq: 'failure', sizeErr: action.err });
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
