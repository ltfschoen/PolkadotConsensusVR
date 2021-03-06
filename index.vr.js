import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
} from 'react-vr';
import ConsensusApp from "./src/ConsensusApp";

// Redux Actions
import {loadConsensus} from './redux/actions/consensusActions';

// Redux Store
import configureStore from './redux/store/configureStore.dev';
import {Provider} from 'react-redux';
const store = configureStore();
store.dispatch(loadConsensus());

export default class PolkadotConsensusVR extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View>
          <Pano source={asset('storm_960_720.jpg')}/>
          <ConsensusApp />
        </View>
      </Provider>
    );
  }
};

AppRegistry.registerComponent('PolkadotConsensusVR', () => PolkadotConsensusVR);
