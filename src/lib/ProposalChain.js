import React from 'react';
import PropTypes from 'prop-types';
import {
	asset,
	View,
	Cylinder
} from 'react-vr';
import TextLabel from './TextLabel';

export default class ProposalChain extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let {
			proposalDuration,
			yRotate,
			zOffset,
			group,
			groupAddresses,
			nodeIds,
			proposalIds,
			finalVote
		} = this.props;

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
						position: 'absolute', // 'relative'
						transform: [
							{rotateX : 50},
							{rotateY : yRotate}, // 85 / -85 // vert rotate
							{rotateZ : -40}, // -30 / 30 // tip away
							// away shift, vert shift, side shift
							{translate: [50, 90, zOffset]}, // [0, 50, 0] / [0, 50, -40]
							{scale : 1.0 }
						],
					}}
				>
					<TextLabel
						proposalDuration={proposalDuration}
						group={group}
						groupAddresses={groupAddresses}
						nodeIds={nodeIds}
						proposalIds={proposalIds}
					/>
					<TextLabel
						finalVote={finalVote}
					/>
				</Cylinder>

			</View>
		);
	}
}

ProposalChain.propTypes = {
	proposalDuration: PropTypes.number,
	yRotate: PropTypes.number,
	zOffset: PropTypes.number,
	group: PropTypes.string,
	groupAddresses: PropTypes.string,
	nodeIds: PropTypes.string,
	proposalIds: PropTypes.string,
	finalVote: PropTypes.string
};
