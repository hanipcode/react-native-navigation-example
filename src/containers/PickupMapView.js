import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import { MapView } from 'expo';
import { buildDirections } from '../services';

const KEY = 'AIzaSyD3scrmGwCtyR8xT2zsCxxKtyqPATAhF5Q';

class PickupMapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      polylinePoints: null
    };
  }
  // componentWillMount() {
  //   this._getLocationAsync();
  // }
  // _getLocationAsync() {
  //   navigator.geolocation.getCurrentPosition(
  //     position => this.setState({ location: position }),
  //     () => Alert.alert('location fetching failure'),
  //     {
  //       enableHighAccuracy: true
  //     }
  //   );
  // }
  componentWillReceiveProps(nextProps) {
    const { pickupCoordinate, dropCoordinate } = nextProps;
    // reset to not drawing anything while waiting to build directions
    this.setState({ polylinePoints: null });
    if (pickupCoordinate || dropCoordinate) {
      const availableCoordinate = [pickupCoordinate, dropCoordinate].filter(
        value => value !== null
      );
      this.map.fitToCoordinates(availableCoordinate, {
        edgePadding: { top: 50, left: 50, right: 50, bottom: 50 },
        animated: true
      });
      if (pickupCoordinate && dropCoordinate) {
        const pickupCoordinateString = `${pickupCoordinate.latitude},${pickupCoordinate.longitude}`;
        const dropCoordinateString = `${dropCoordinate.latitude},${dropCoordinate.longitude}`;
        buildDirections(pickupCoordinateString, dropCoordinateString, KEY)
          .then(polylinePoints => {
            this.setState({ polylinePoints });
          })
          .catch(err => console.log(err));
      }
    }
  }
  render() {
    console.log(this.state);
    return (
      <MapView
        style={{ flex: 1 }}
        ref={ref => {
          this.map = ref;
        }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      >
        {this.props.pickupCoordinate && (
          <MapView.Marker coordinate={this.props.pickupCoordinate} />
        )}
        {this.props.dropCoordinate && (
          <MapView.Marker coordinate={this.props.dropCoordinate} />
        )}
        {this.state.polylinePoints && (
          <MapView.Polyline
            coordinates={this.state.polylinePoints}
            strokeWidth={4}
            strokeColor="#1abc9c"
            lineJoin={this.state.polylinePoints}
            geodesic
          />
        )}
      </MapView>
    );
  }
}

export default PickupMapView;
