// @flow

export const LOCATION_FETCH_REQUESTED = 'location/LOCATION_FETCH_REQUESTED'
export const LOCATION_FETCH_SUCCEEDED = 'location/LOCATION_FETCH_SUCCEEDED'
export const LOCATION_FETCH_FAILED = 'location/LOCATION_FETCH_FAILED'


export type LocationFetchRequestedAction = {
  type: 'location/LOCATION_FETCH_REQUESTED',
  payload: number
}
export const locationFetchRequested: (id: number) => LocationFetchRequestedAction = (id) => ({
  type: LOCATION_FETCH_REQUESTED,
  payload: id
})


export type LocationFetchSucceededAction = {
  type: 'location/LOCATION_FETCH_SUCCEEDED',
  payload: any
}
export const locationFetchSucceeded: (results: any) => LocationFetchSucceededAction = (results) => ({
  type: LOCATION_FETCH_SUCCEEDED,
  payload: results
})

//Set fetch failed
export type LocationFetchFailedAction = {
  type: 'location/LOCATION_FETCH_FAILED',
  payload: any
}
export const locationFetchFailed: (message: any) => LocationFetchFailedAction = (message) => ({
  type: LOCATION_FETCH_FAILED,
  payload: message
})

export type LocationActions =
  LocationFetchRequestedAction |
  LocationFetchSucceededAction |
  LocationFetchFailedAction