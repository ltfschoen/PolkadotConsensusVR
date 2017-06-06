import React from 'react';
import PropTypes from 'prop-types';
import {
	asset,
	View,
	Image
} from 'react-vr';
import CylindricalPanel from 'CylindricalPanel';

import Button from './Button';
import ConsensusStatus from './ConsensusStatus';
import ProposalChain from './ProposalChain';

export default class CylindricalPanelCustom extends React.Component {

	render() {
		let { onStartRound, onStepRound, consensus } = this.props;

		// debugger;
		consensusAsStr = "";
		if (typeof consensus !== 'undefined' && consensus.length > 0) {
			consensusAsStr = [
				`Time: ${consensus[0]["timeCount"]}`,
				`Groups: ${consensus[0]["groupsCount"]}`,
				`Members: ${consensus[0]["membersCount"]}`,
				`Nodes: ${consensus[0]["nodesCount"]}`
			].join(", ");
		}

		let consensusProposalChains = [];
		if (typeof consensus !== 'undefined' && consensus.length > 0) {
			let i = 0;
			// i.e. "A": { ...
			for (let group in consensus[0]["groups"]) {
				let nodeId, proposalId, proposalDuration, finalVote = null;
				// i.e. "A": { "0": { ...
				for (let groupAddress in consensus[0]["groups"][group]) {
					nodeId = consensus[0]["groups"][group][groupAddress]["id"];
					proposalId = consensus[0]["groups"][group][groupAddress]["proposal"];
					proposalDuration = consensus[0]["groups"][group][groupAddress]["proposalDuration"];
					finalVote = consensus[0]["groups"][group][groupAddress]["finalVote"];
				}
				consensusProposalChains.push(
					<ProposalChain
						key={i}
						proposalDuration={proposalDuration * 100 || 300} // proposalDuration is 0 to 3
						yRotate={85}
						zOffset={-120 + 40 * i}
					/>
				);
				i++;
			}
		}

		let bufferWidthPx = 2000;
		let bufferHeightPx = 720;
		let numberOfPxForACompleteTurn = 2000;
		// let distanceFromTheViewer = 20;

		return (
			<View>
				<CylindricalPanel
					layer={{
						width: bufferWidthPx,
						height: bufferHeightPx,
						density: numberOfPxForACompleteTurn,
						// radius: distanceFromTheViewer
					}}
					style={{
						position: 'absolute'
					}}>
					<View
						style={{
							opacity: 1,
							width: 2000,
							height: 720,
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<ConsensusStatus
							name={consensusAsStr}
							x={125}
							y={40}
							distanceFromCamera={-200}
						/>
						<Button
							onStartRound={onStartRound}
							name="Start Round"
							x={-140} y={20} z={0}/>
						<Button
							onStepRound={onStepRound}
							name="Step Round"
							x={-140} y={0} z={0}/>
						<Image
							style={{
								borderRadius: 20,
								backgroundColor: 'red',
								borderWidth: 10,
								width: 450,
								height: 225,
								position: 'absolute',
								transform: [
									{rotateX : 0},
									{rotateY : 0},
									{rotateZ : 0},
									{translate: [-195, -70, -180]},
									{scale : 0.25 }
								]
							}}

							// source={{ uri: 'https://facebook.github.io/react/img/logo_og.png', }}
							source={asset('storm_960_720.jpg')}
						/>
						{consensusProposalChains}
					</View>
				</CylindricalPanel>
			</View>
		);
	}
}

CylindricalPanelCustom.propTypes = {
	onStartRound: PropTypes.func.isRequired,
	onStepRound: PropTypes.func.isRequired,
	consensus: PropTypes.array.isRequired
};
