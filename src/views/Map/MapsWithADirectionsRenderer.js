// @flow
/* eslint-disable no-undef */
import React from 'react';
import { compose, withProps, lifecycle } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
  Marker,
} from "react-google-maps";
import busImage from '../../media/smallBus.png'
import houseImage from '../../media/house.png'



export const MapWithADirectionsRenderer = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `750px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {
      const DirectionsService = new google.maps.DirectionsService();

      DirectionsService.route({
        origin: new google.maps.LatLng(42.896277, -78.868893),
        destination: new google.maps.LatLng(42.896277, -78.868893),
        travelMode: google.maps.TravelMode.DRIVING,
        waypoints: [
          {
            location: '42.894902, -78.869017',
            stopover: false,
          },
          {
            location: '42.895106, -78.870186',
            stopover: false,
          },
        ]
      }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          console.log('Directions:', result)
          this.setState({
            directions: result,
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      });
    }
  })
)(props =>
  <GoogleMap
    defaultZoom={7}
    defaultCenter={new google.maps.LatLng(42.896277, -78.868893)}
  >
    {props.directions && <DirectionsRenderer directions={props.directions} />}
    <Marker
      position={{ lat: 42.895106,  lng: -78.870186, }}
      icon={{
        url: busImage,
        size: new google.maps.Size(70, 35),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(35, 10)
      }}
    />
    <Marker
      position={this.location.homeLocation}
      icon={{
        url: houseImage,
        size: new google.maps.Size(50, 50),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(25, 25)
      }}
    />
  </GoogleMap>
);