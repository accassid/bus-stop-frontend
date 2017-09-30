// @flow
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import type { Element, Dispatch } from 'prop-types'
/* eslint-disable no-undef */
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

import { Button } from 'semantic-ui-react'
import { locationFetchRequested } from "../../modules/location/actions";


class Map extends PureComponent{
  state = {
    distance: '---'
  }

  getMap() {
    const MapWithADirectionsRenderer = compose(
      withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{height: `100%`}}/>,
        containerElement: <div style={{height: `750px`}}/>,
        mapElement: <div style={{height: `100%`}}/>,
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
        {props.directions && <DirectionsRenderer directions={props.directions}/>}
        <Marker
          position={this.props.location.busLocation}
          icon={{
            url: busImage,
            // This marker is 20 pixels wide by 32 pixels high.
            size: new google.maps.Size(70, 35),
            // The origin for this image is (0, 0).
            origin: new google.maps.Point(0, 0),
            // The anchor for this image is the base of the flagpole at (0, 32).
            anchor: new google.maps.Point(35, 10)
          }}
        />
        <Marker
          position={{lat: 42.896602, lng: -78.869652,}}
          icon={{
            url: houseImage,
            // This marker is 20 pixels wide by 32 pixels high.
            size: new google.maps.Size(50, 50),
            // The origin for this image is (0, 0).
            origin: new google.maps.Point(0, 0),
            // The anchor for this image is the base of the flagpole at (0, 32).
            anchor: new google.maps.Point(35, 10)
          }}
        />
      </GoogleMap>
    );
      return MapWithADirectionsRenderer
  }

  // shouldComponentUpdate(nextProps, nextState){
  //   if(nextProps.location.busLocation.lat === this.props.location.busLocation.lat && nextProps.location.busLocation.lng === this.props.location.busLocation.lng){
  //     return false
  //   }
  //   return true
  // }


  componentWillUpdate(nextProps, nextState){
    var service = new google.maps.DistanceMatrixService();
    const busLocation = nextProps.location.busLocation
    const homeLocation = nextProps.location.homeLocation
    service.getDistanceMatrix(
      {
        origins: [new google.maps.LatLng(busLocation.lat, busLocation.lng)],
        destinations: [new google.maps.LatLng(homeLocation.lat, homeLocation.lng)],
        travelMode: 'DRIVING',
      }, (result, status) => {
        if (status === google.maps.DistanceMatrixStatus.OK) {
          // console.log(distance)
          // console.log('Distance:', result.rows[0].elements[0].duration.text)
          const distance =  result.rows[0].elements[0].duration.text

          this.setState({distance: distance})
        } else {
          console.error(`error fetching directions ${result}`);
        }
      });

  }

  render(): Element<any>{
    console.log('rendering')
    console.log(this.state.distance)
    // console.log(this.props.location.busLocation)

    const RenderedMap = this.getMap()
    return(
      <div>
        <RenderedMap/>
        ETA: {this.state.distance}
        <Button onClick={() => this.props.fetchLocation(1)}>Update</Button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    location: state.location
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    fetchLocation: ((id) => dispatch(locationFetchRequested(id))),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);