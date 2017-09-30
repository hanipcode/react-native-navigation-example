import React, { Component } from 'react';
import { View } from 'react-native';
import SearchBox from './SearchBox';
import PickupMapView from './PickupMapView';

class PickupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pickupCoordinate: null,
      dropCoordinate: null
    };
  }
  _setPickup(geometry) {
    const { location } = geometry;
    const coordinate = {
      latitude: location.lat,
      longitude: location.lng
    };
    this.setState({ pickupCoordinate: coordinate });
    console.log('geo', geometry);
  }
  _setDrop(geometry) {
    const { location } = geometry;
    const coordinate = {
      latitude: location.lat,
      longitude: location.lng
    };
    this.setState({ dropCoordinate: coordinate });
  }

  render() {
    console.log(this.state);
    return (
      <View style={{ flex: 1 }}>
        <PickupMapView
          pickupCoordinate={this.state.pickupCoordinate}
          dropCoordinate={this.state.dropCoordinate}
        />
        <SearchBox
          onItemClick={geometry => this._setPickup(geometry)}
          placeholder="Lokasi Pickup"
        />
        <SearchBox
          onItemClick={geometry => this._setDrop(geometry)}
          placeholder="Lokasi Drop"
          style={{ marginTop: 49 }}
        />
      </View>
    );
  }
}

export default PickupPage;
