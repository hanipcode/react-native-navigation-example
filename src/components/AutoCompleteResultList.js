import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

const styles = StyleSheet.create({
  FloatingContainer: {
    position: 'absolute',
    alignSelf: 'stretch',
    top: 53,
    left: 0,
    right: 0,
    marginHorizontal: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderTopWidth: 0,
    borderColor: '#aaa',
    elevation: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    backgroundColor: '#FFF'
  },
  AutoCompleteResultList: {
    elevation: 2,
    alignSelf: 'stretch'
  },
  AutoCompleteResultItem: {
    padding: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ddd'
  },
  titleText: {
    fontWeight: '600',
    color: '#333',
    marginTop: 5,
    marginBottom: 3,
    fontSize: 16
  },
  text: {
    marginLeft: 2,
    color: '#999'
  }
});

class AutoCompleteResultList extends Component {
  renderItem({ item }) {
    return (
      <TouchableHighlight
        underlayColor="#dddddd"
        onPress={() => this._onItemClick(item.geometry, item.formatted_address)}
        style={styles.AutoCompleteResultItem}
      >
        <View>
          <Text style={styles.titleText}>{item.name}</Text>
          <Text style={styles.text}>{item.formatted_address}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  _onItemClick(geometry, name) {
    this.props.onItemClick(geometry);
    this.props.finishResult(name);
  }
  render() {
    if (this.props.data.length === 0) {
      return <View />;
    }
    return (
      <View style={styles.FloatingContainer}>
        <FlatList
          {...this.props}
          contentContainerStyle={styles.AutoCompleteResultList}
          renderItem={itemValue => this.renderItem(itemValue)}
          keyboardShouldPersistTaps
        />
      </View>
    );
  }
}

AutoCompleteResultList.defaultProps = {
  data: [
    {
      name: 'Nusajaya',
      formatted_address: 'Nusajaya, Johor, Malaysia',
      geometry: { location: [Object], viewport: [Object] },
      placeId: 'ChIJ4ZAlkm0M2jER0pKJ66wKpB8'
    },
    {
      name: 'Penida Island',
      formatted_address:
        'Penida Island, Nusapenida, Klungkung Regency, Bali, Indonesia',
      geometry: { location: [Object], viewport: [Object] },
      placeId: 'ChIJ0xkTTRlx0i0Re3sZsgY3Olw'
    },
    {
      name: 'Lembongan island',
      formatted_address:
        'Lembongan island, Jungutbatu, Nusapenida, Klungkung Regency, Bali, Indonesia',
      geometry: { location: [Object], viewport: [Object] },
      placeId: 'ChIJ82l7U59t0i0RM6BnbL2UG9w'
    },
    {
      name: 'West Nusa Tenggara',
      formatted_address: 'West Nusa Tenggara, Indonesia',
      geometry: { location: [Object], viewport: [Object] },
      placeId: 'ChIJIe0SGpQNuC0RxXX30MzCZ2k'
    },
    {
      name: 'Nusaybin',
      formatted_address: 'Nusaybin, 47300 Nusaybin/Mardin, Turkey',
      geometry: { location: [Object], viewport: [Object] },
      placeId: 'ChIJy-PmO9cPCkARZ4iqwGNE7sU'
    }
  ],
  onItemClick: geo => console.log(geo)
};
export default AutoCompleteResultList;
