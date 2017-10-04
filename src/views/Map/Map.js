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
// import InfoBox from "react-google-maps/lib/components/addons/InfoBox";
import busImage from '../../media/smallBus.png'
import houseImage from '../../media/house.png'
import { Message } from 'semantic-ui-react'
import { locationFetchRequested } from "../../modules/location/actions";
import firebase from 'firebase'

class Map extends PureComponent{
  state = {
    distance: '---',
    timer: null,
    counter: 0,
  }

  constructor(){
    super()
    var config = {
      apiKey: "AIzaSyAq0UtWAxQKTGJAF1v-TvDJwWk1_DHDGBI",
      authDomain: "busstop2017-1506747784897.firebaseapp.com",
      databaseURL: "https://busstop2017-1506747784897.firebaseio.com",
      projectId: "busstop2017-1506747784897",
      storageBucket: "busstop2017-1506747784897.appspot.com",
      messagingSenderId: "980482682485"
    };
    firebase.initializeApp(config);
    this.db = firebase.database()
    this.tick = this.tick.bind(this)
  }

  componentDidMount() {
    let timer = setInterval(this.tick, 5000);
    this.setState({timer});
  }
  componentWillUnmount() {
    this.clearInterval(this.state.timer);
  }
  tick() {
    this.props.fetchLocation(1, this.db)
    // this.setState({
    //   counter: this.state.counter + 1
    // });
  }

  getMap() {
    const MapWithADirectionsRenderer = compose(
      withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyA5BsI0gfyJ1Si-tu8yTlgUt9WPzlABegk&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{height: `90%`}}/>,
        containerElement: <div style={{height: `750px`}}/>,
        mapElement: <div style={{height: `90%`}}/>,
        busLocation: this.props.location.busLocation,
        homeLocation: this.props.location.homeLocation,
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
              {
                location: '42.895556, -78.873517',
                stopover: false,
              },
              {
                location: '42.896815, -78.870734',
                stopover: false,
              },
              {
                location: '42.898588, -78.870131',
                stopover: false,
              },
              {
                location: '42.898560, -78.867814',
                stopover: false,
              },
            ]
          }, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
              // console.log('Directions:', result)
              this.setState({
                directions: result,
              });
            } else {
              console.error(`error fetching directions ${result}`);
            }
          });

          var service = new google.maps.DistanceMatrixService();
          const busLocation = this.props.busLocation
          const homeLocation = this.props.homeLocation
          service.getDistanceMatrix(
            {
              origins: [new google.maps.LatLng(busLocation.lat, busLocation.lng)],
              destinations: [new google.maps.LatLng(homeLocation.lat, homeLocation.lng)],
              travelMode: 'DRIVING',
            }, (result, status) => {
              if (status === google.maps.DistanceMatrixStatus.OK) {
                const distance =  result.rows[0].elements[0].duration.text
                // console.log(distance)
                this.setState({distance: distance})
              } else {
                console.error(`error fetching directions ${result}`);
              }
            });
        }
      })
    )(props => {
      // let time = Number(this.state.distance.replace(/[^0-9]*/ig, ''))
      return(
        <div>
          {
            props.distance &&
            <Message
              error={Number(this.state.distance.replace(/[^0-9]*/ig, '')) <= 5}
              success={Number(this.state.distance.replace(/[^0-9]*/ig, '')) > 5}
              header={'Your bus is ' + props.distance + ' away.'}
            />
          }
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
              position={this.props.location.homeLocation}
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
        </div>
      )
      }
    );
      return MapWithADirectionsRenderer
  }

//   /            {props.distance &&
// <InfoBox
// defaultPosition={new google.maps.LatLng(this.props.location.busLocation.lat-0.00015, this.props.location.busLocation.lng)}
// options={{ closeBoxURL: ``, enableEventPropagation: true }}
// >
// <div style={{ backgroundColor: Number(this.state.distance.replace(/[^0-9]*/ig, '')) < 5 ? 'red' : 'yellow', opacity: 0.75, padding: `12px` }}>
// <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
// {props.distance}
// </div>
// </div>
// </InfoBox>
// }

  shouldComponentUpdate(nextProps, nextState){
    if(nextProps.location.busLocation.lat === this.props.location.busLocation.lat && nextProps.location.busLocation.lng === this.props.location.busLocation.lng){
      return false
    }
    return true
  }


  // componentWillUpdate(nextProps, nextState){
  //   var service = new google.maps.DistanceMatrixService();
  //   const busLocation = nextProps.location.busLocation
  //   const homeLocation = nextProps.location.homeLocation
  //   service.getDistanceMatrix(
  //     {
  //       origins: [new google.maps.LatLng(busLocation.lat, busLocation.lng)],
  //       destinations: [new google.maps.LatLng(homeLocation.lat, homeLocation.lng)],
  //       travelMode: 'DRIVING',
  //     }, (result, status) => {
  //       if (status === google.maps.DistanceMatrixStatus.OK) {
  //         const distance =  result.rows[0].elements[0].duration.text
  //
  //         this.setState({distance: distance})
  //       } else {
  //         console.error(`error fetching directions ${result}`);
  //       }
  //     });
  //
  // }

  render(): Element<any>{
    // console.log('rendering')
    // console.log(this.state.distance)
    // console.log(this.props.location.busLocation)

    // let time = Number(this.state.distance.replace(/[^0-9]*/ig, ''))
    // console.log(time)
    const RenderedMap = this.getMap()
    return(
      <div>
        {/*<Message*/}
          {/*error={time <= 5}*/}
          {/*success={time > 5}*/}
          {/*header={'Your bus is '+this.state.distance+' away.'}*/}
        {/*/>*/}
        {/*<Button onClick={() => this.props.fetchLocation(1, this.db)}>Update</Button>*/}
        <RenderedMap/>
        {/*<Button onClick={() => this.props.fetchLocation(1, this.db)}>Update</Button>*/}
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
    fetchLocation: ((id, db) => dispatch(locationFetchRequested(id, db))),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);