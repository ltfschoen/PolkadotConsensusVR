import React from 'react';
import PropTypes from 'prop-types';
import {
	Text,
	View
} from 'react-vr';

export default class Button extends React.Component {
	render() {
		let {
			proposalDuration,
			group,
			groupAddresses,
			nodeIds,
			proposalIds,
			finalVote
		} = this.props;

		let inputs;
		inputs = finalVote ? null : [
			`group_id: ${group}`,
			`\ngroup_addr: \n[${groupAddresses}]`,
			`\nnode_ids: \n[${nodeIds}]`,
			`\nproposal_ids: \n[${proposalIds}]`,
			`\nproposal_dur: ${proposalDuration/100}`
		].join();

		let outputs = [];
		if (finalVote) {
			outputs = [`consensus: `];
			let finalVoteObj = JSON.parse(finalVote);
			for (let group in finalVoteObj) {
				if (finalVoteObj.hasOwnProperty(group)) {
					if (finalVoteObj[group].hasOwnProperty("ticket")) {
							outputs.push(`\n${group}: ${finalVoteObj[group]["ticket"]}`);
					} else {
							outputs.push(`\n${group}: TBC`);
					}
				}
			}
		}
		outputs = outputs.join();

		return (
			<View>
				{
					inputs || outputs ?

						<Text style={{
							opacity: 1.0,
							backgroundColor: finalVote ? "#551A8B" : "#000000",
							fontSize: 12,
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
								{rotateY: -60}, // rotate around axis
								{rotateZ: 0},
								// x performs offset
								{translate: [80, 0, -40]}, // 10, 0, -80
								{scale: 1.0}
							],
						}}>
							{ inputs }
							{ outputs }

						</Text>

					: null
				}
			</View>
		);
	}
}

Button.propTypes = {
	proposalDuration: PropTypes.number,
	group: PropTypes.string,
	groupAddresses: PropTypes.string,
	nodeIds: PropTypes.string,
	proposalIds: PropTypes.string,
	finalVote: PropTypes.string
};