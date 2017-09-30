//@flow

import { call, put, fork, take, all, } from 'redux-saga/effects'
import {
  LOCATION_FETCH_REQUESTED,
  LOCATION_FETCH_SUCCEEDED,
  LOCATION_FETCH_FAILED,
} from "./location/actions"

import type { LocationFetchRequestedAction } from "./location/actions"

function* fetchLocation(): Generator<*, *, *> {
  while(true) {
    const action: LocationFetchRequestedAction = yield take(LOCATION_FETCH_REQUESTED)
    try {
      const results = yield call(getResults, action.payload)
      yield put({type: LOCATION_FETCH_SUCCEEDED, payload: results})
    } catch (e) {
      yield put({type: LOCATION_FETCH_FAILED, payload: e.message})
    }
  }
}

const getResults = (id) =>{
  let myRequest = new URL('http://192.168.201.69:5000/bus/getlocation/'+id)
  return fetch(myRequest)
    .then(res => {
      return res.json()
    } )
    .then( data => data)
    .catch(ex => {
      console.log('parsing failed', ex);
      return ({ ex });
    })
}

export default function* root(): Generator<*, *, *> {
  yield all([
    fork(fetchLocation),
  ])
}