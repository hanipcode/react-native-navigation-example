import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Expo from 'expo';
import Pickup from './src/containers/PickupPage';

console.disableYellowBox = true;

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Pickup />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: Expo.Constants.statusBarHeight
  }
});
