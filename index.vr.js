import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
} from 'react-vr';
import DNAStrand from "./src/DNAStrand";

// Redux Actions
import {loadSkills} from './redux/actions/skillActions';

// Redux Store
import configureStore from './redux/store/configureStore.dev';
import {Provider} from 'react-redux';
const store = configureStore();
store.dispatch(loadSkills());

export default class PolkadotConsensusVR extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View>
          <Pano source={asset('storm_960_720.jpg')}/>
          <DNAStrand />
        </View>
      </Provider>
    );
  }
};

AppRegistry.registerComponent('PolkadotConsensusVR', () => PolkadotConsensusVR);
