// @flow

import { LocationState } from "./index";
import { LocationActions } from "./actions";
import {
  LOCATION_FETCH_SUCCEEDED,
  LOCATION_FETCH_FAILED
} from "./actions";

export const initialState: LocationState = {
  busLocation: { lat: 42.895106,  lng: -78.870186, },
  homeLocation:  { lat: 42.896602,  lng: -78.869652, }
}

export default (state: LocationState = initialState, action: LocationActions) => {
  switch (action.type) {
    case LOCATION_FETCH_SUCCEEDED:
      return{
        ...state,
        busLocation: {lat: action.payload.latitude, lng: action.payload.longitude}
      }
    case LOCATION_FETCH_FAILED:
      console.log(action.payload)
      return{
        ...state,
      }
    default:
      return state
  }
}