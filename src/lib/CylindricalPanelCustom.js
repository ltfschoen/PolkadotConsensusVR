import React from 'react';
import PropTypes from 'prop-types';
import {
	asset,
	View,
	Image,
	Text
} from 'react-vr';
import CylindricalPanel from 'CylindricalPanel';

import Button from './Button';
import ConsensusStatus from './ConsensusStatus';
import ProposalChain from './ProposalChain';

export default class CylindricalPanelCustom extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			consensusCount: 0
		};

		this.handleConsensusChange = this.handleConsensusChange.bind(this)
	}

	handleConsensusChange(finalVotesReachedCount) {
		// return (finalVotesReachedCount) => {
			this.setState({
				consensusCount: finalVotesReachedCount
			});
		// }
	}

	componentWillReceiveProps() {

		let { consensus } = this.props;

		if (typeof consensus !== 'undefined' && consensus.length > 0) {

			let finalVotesPerGroup = {};
			for (let group in consensus[0]["groups"]) {
				let finalVote = null;
				// i.e. "A": { "0": { ...
				for (let groupAddress in consensus[0]["groups"][group]) {
					finalVote = consensus[0]["groups"][group][groupAddress]["finalVote"];

					// Check if achieved final consensus with all four votes for a group
					let finalVoteObj = JSON.parse(finalVote);
					for (let g in finalVoteObj) {
						if (finalVoteObj[g] != "") {
							if (finalVotesPerGroup.hasOwnProperty(g)) {
								finalVotesPerGroup[g] += 1;
							} else {
								finalVotesPerGroup[g] = 1;
							}
						}
					}
				}
			}

			// Update GUI with count of groups in final state
			let finalVotesReachedCount = 0;
			for (let group in finalVotesPerGroup) {
				console.log("finalVotesPerGroup[group]: ", finalVotesPerGroup[group]);
				if (finalVotesPerGroup[group] = 4) {
					finalVotesReachedCount += 1;
				}
			}
			if (finalVotesReachedCount > 0) {
				this.handleConsensusChange(finalVotesReachedCount);
			}

			console.log("finalVotesPerGroup: ", finalVotesPerGroup);
			console.log("finalVotesReachedCount: ", finalVotesReachedCount);
		}

	}

	render() {
		let { onStartRound, onStepRound, consensus } = this.props;
		let { consensusCount } = this.state;

		// debugger;
		let consensusAsStr = "";
		let consensusGroupsCountTotal = "";
		if (typeof consensus !== 'undefined' && consensus.length > 0) {
			consensusAsStr = [
				`Time: ${consensus[0]["timeCount"]}`,
				`Groups: ${consensus[0]["groupsCount"]}`,
				`\nMembers: ${consensus[0]["membersCount"]}`,
				`Nodes: ${consensus[0]["nodesCount"]}`
			].join(", ");

			consensusGroupsCountTotal = consensus[0]["groupsCount"] || "";
		}

		let consensusProposalChains = [];
		if (typeof consensus !== 'undefined' && consensus.length > 0) {
			let i = 0;
			// i.e. "A": { ...
			for (let group in consensus[0]["groups"]) {
				let proposalDuration, finalVote = null;
				let proposalIds = [];
				let nodeIds = [];
				let groupAddresses = [];
				// i.e. "A": { "0": { ...
				for (let groupAddress in consensus[0]["groups"][group]) {
					if (consensus[0]["groups"][group][groupAddress].hasOwnProperty("proposal")) {
						if (consensus[0]["groups"][group][groupAddress]["proposal"].hasOwnProperty("ticket")) {
							proposalIds.push(consensus[0]["groups"][group][groupAddress]["proposal"]["ticket"]);
						}
					}
					proposalDuration = consensus[0]["groups"][group][groupAddress]["proposalDuration"];
					finalVote = consensus[0]["groups"][group][groupAddress]["finalVote"];
					nodeIds.push(consensus[0]["groups"][group][groupAddress]["id"]);
					groupAddresses.push(groupAddress);
				}

				consensusProposalChains.push(
					<ProposalChain
						key={i}
						proposalDuration={proposalDuration * 100 || 300} // proposalDuration is 0 to 3
						yRotate={85}
						zOffset={-160 + 120 * i} // left shift amount toward menu and then distance between each chain
					  group={group}
					  groupAddresses={groupAddresses.join(", ")}
					  nodeIds={nodeIds.join(", ")}
					  proposalIds={proposalIds.join(", ")}
					  finalVote={finalVote}
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
						<Button
							// onSubmit={this.handleConsensusChange(0)}
							onStartRound={onStartRound}
							name="Start Round"
							x={-140} y={20} z={0}
						/>
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
						>
							<Text style={{
								opacity: 1.0,
								backgroundColor: (consensusCount == 4 ? "green" : "red"),
								fontSize: 40,
								fontWeight: '400',
								borderRadius: 10,
								layoutOrigin: [0.5, 0.5],
								paddingLeft: 6,
								paddingRight: 6,
								textAlign: 'center',
								textAlignVertical: 'center',
								position: 'relative',
								transform: [
									{rotateX: 0},
									{rotateY: 0},
									{rotateZ: 0},
									{translate: [220, -30, 0]},
									{scale: 1.0}
								],
							}}>
								Consensus count: { consensusCount } / { consensusGroupsCountTotal }
							</Text>
							<ConsensusStatus
								name={consensusAsStr}
								x={125}
								y={40}
								distanceFromCamera={-200}
							/>
						</Image>

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
