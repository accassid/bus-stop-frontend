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
      // console.log(results)
      yield put({type: LOCATION_FETCH_SUCCEEDED, payload: results})
    } catch (e) {
      yield put({type: LOCATION_FETCH_FAILED, payload: e.message})
    }
  }
}

const getResults = (payload) =>{
  return payload.db.ref('location/'+payload.id).once('value').then( (snapshot)=>{
    return snapshot.val()
  })

}

export default function* root(): Generator<*, *, *> {
  yield all([
    fork(fetchLocation),
  ])
}