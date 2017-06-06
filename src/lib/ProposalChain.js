import React from 'react';
import PropTypes from 'prop-types';
import {
	asset,
	View,
	Cylinder
} from 'react-vr';

export default class ProposalChain extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let { proposalDuration, yRotate, zOffset } = this.props;
		return (
			<View>
				<Cylinder
					radiusTop={15}
					radiusBottom={15}
					dimHeight={proposalDuration}
					segments={12}
					texture={asset('dna_black.png')}
					lit={true}
					wireframe={false}
					style={{
						// position: 'absolute', // 'relative'
						transform: [
							{rotateX : 0},
							{rotateY : yRotate}, // 85 / -85 // vert rotate
							{rotateZ : -30}, // -30 / 30 // tip away
							// away shift, vert shift, side shift
							{translate: [0, 50, zOffset]}, // [0, 50, 0] / [0, 50, -40]
							{scale : 1.0 }
						],
					}}
				/>
			</View>
		);
	}
}

ProposalChain.propTypes = {
	proposalDuration: PropTypes.number,
	yRotate: PropTypes.number,
	zOffset: PropTypes.number
};
