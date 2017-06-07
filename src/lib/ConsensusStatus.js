import React from 'react';
import {
	Text
} from 'react-vr';

export default class ConsensusStatus extends React.Component {
	render() {
		let { x, y, distanceFromCamera } = this.props; // i.e. -3

		// Control panel config override
		x = 220;
		y = -60;
		distanceFromCamera = 0;

		return (
			<Text style={{
				backgroundColor: '#777879',
				fontSize: 40, // 20
				fontWeight: '400',
				borderRadius: 20,
				layoutOrigin: [0.5, 0.5],
				paddingLeft: 10,
				paddingRight: 10,
				textAlign: 'center',
				textAlignVertical: 'center',
				transform: [{translate: [x, y, distanceFromCamera]}],
			}}>
				{this.props.name}
			</Text>
		);
	}
}