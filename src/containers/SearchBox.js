import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AutoCompleteBox from '../components/AutoCompleteBox';
import AutoCompleteResultList from '../components/AutoCompleteResultList';
import { getPredictionWithDetail } from '../services.js';

const KEY = 'AIzaSyD3scrmGwCtyR8xT2zsCxxKtyqPATAhF5Q';

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      data: [],
      loading: false
    };
  }
  onChangeText(query) {
    this.setState({ query });
    getPredictionWithDetail(query, KEY).then(result => {
      if (query === '') {
        return;
      }
      this.setState({ data: result, loading: false });
    });
  }

  _finishResult(text) {
    this.setState({ query: text, data: [] });
  }

  _onItemClick(geometry) {
    this.props.onItemClick(geometry);
  }
  render() {
    return (
      <View
        style={[
          { position: 'absolute', left: 0, right: 0, top: 0 },
          this.props.style
        ]}
      >
        <AutoCompleteBox
          placeholder={this.props.placeholder || 'Masukan Nama Tempat'}
          value={this.state.query}
          onChangeText={query => this.onChangeText(query)}
          clearInput={() => this.setState({ query: '', data: [] })}
        />
        <AutoCompleteResultList
          data={this.state.data}
          onItemClick={geometry => this._onItemClick(geometry)}
          finishResult={text => this._finishResult(text)}
        />
      </View>
    );
  }
}

export default SearchBox;
