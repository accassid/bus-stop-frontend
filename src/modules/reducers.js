// @flow

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import type {LocationState} from "./location/index";
import { initialState as locationInitialState } from "./location/reducer";
import { default as location } from './location/reducer'


export type AppState = {
  location: LocationState
}

export const defaultAppState = {
  location: locationInitialState
}

export default combineReducers({
  location,
  routing: routerReducer
})

export const selectLocation = (state: AppState) => {
  return state.location
}