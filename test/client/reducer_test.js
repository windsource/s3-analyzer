/* global assert*/
'use strict';

import buckets from '../../client/js/reducers';
import * as types from '../../client/js/actions';

describe('Testing reducer', () => {
  it('should test GET_LIST', () => {
    const action = { type: types.GET_LIST };
    assert.deepEqual(buckets({}, action), { listReq: 'pending' });
  });

  it('should test GET_REGION_SUCCESS', () => {
    const action = {
      type: types.GET_REGION_SUCCESS,
      bucketName: 'two',
      region: 'eu-central-1',
    };
    const stateBefore = {
      listReq: 'success',
      list: [
        { bucketName: 'one', regionReq: 'pending' },
        { bucketName: 'two', regionReq: 'pending' },
        { bucketName: 'three', regionReq: 'pending' },
      ],
    };
    const expectedStateAfter = {
      listReq: 'success',
      list: [
        { bucketName: 'one', regionReq: 'pending' },
        { bucketName: 'two', regionReq: 'success', region: 'eu-central-1' },
        { bucketName: 'three', regionReq: 'pending' },
      ],
    };
    assert.deepEqual(buckets(stateBefore, action), expectedStateAfter);
  });
});
