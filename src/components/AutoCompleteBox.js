import React, { Component } from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

const styles = StyleSheet.create({
  AutoCompleteBox: {
    flexDirection: 'row',
    padding: 10,
    alignSelf: 'stretch',
    backgroundColor: '#FFF',
    borderColor: '#BBB',
    borderBottomWidth: StyleSheet.hairlineWidth,
    elevation: 1
  },
  AutoCompleteInput: {
    flexGrow: 1
  },
  AutoCompleteClose: {
    padding: 5,
    color: '#999',
    fontWeight: '300',
    elevation: 5,
    fontSize: 16
  }
});

const AutoCompleteBox = props => (
  <View style={styles.AutoCompleteBox}>
    <TextInput
      {...props}
      underlineColorAndroid="#FFF"
      style={styles.AutoCompleteInput}
    />
    <TouchableOpacity onPress={() => props.clearInput()}>
      {props.value.length > 0 && (
        <Text style={styles.AutoCompleteClose}>X</Text>
      )}
    </TouchableOpacity>
  </View>
);

AutoCompleteBox.defaultProps = {
  clearInput: () => console.log('Clear Input Pressed')
};

export default AutoCompleteBox;
