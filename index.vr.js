import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
} from 'react-vr';
import DNAStrand from "./src/DNAStrand";

export default class PolkadotConsensusVR extends React.Component {
  render() {
    return (
      <View>
        <Pano source={asset('storm_960_720.jpg')}/>
        <DNAStrand/>
      </View>
    );
  }
};

AppRegistry.registerComponent('PolkadotConsensusVR', () => PolkadotConsensusVR);
