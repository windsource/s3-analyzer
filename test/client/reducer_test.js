/* global assert*/
'use strict';

import buckets from '../../client/js/reducers';
import * as types from '../../client/js/actions';

describe('Testing reducer', () => {
  it('should test GET_LIST', () => {
    const action = { type: types.GET_LIST };
    assert.deepEqual(buckets({}, action), { listReq: 'pending' });
  });
});
