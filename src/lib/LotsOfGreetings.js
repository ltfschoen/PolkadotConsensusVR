import React from 'react';
import {
	View,
} from 'react-vr';
import Greeting from './Greeting';

export default class LotsOfGreetings extends React.Component {
	render() {
		return (
			<View>
				<View style={{transform: [{translate: [0, 0, -3]}]}}>
					<Greeting name='Rexxar' />
					<Greeting name='Jaina' />
					<Greeting name='Valeera' />
				</View>
			</View>
		);
	}
}