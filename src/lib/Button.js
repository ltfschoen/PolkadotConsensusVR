import React from 'react';
import PropTypes from 'prop-types';
import {
	Text,
	Image
} from 'react-vr';

const VrButton = require('VrButton');

export default class Button extends React.Component {
	constructor(props) {
		super(props);
		this.state = {open: false};
	}
	render() {
		let { onStartRound, onStepRound, name, x, y, z } = this.props;
		let bgC = onStartRound ? '#00CCAA' : '#00CCDD';
		return (
			<VrButton
				onClick={() => {
					this.setState({open: !this.state.open});
					setTimeout(() => { this.setState({open: !this.state.open}); }, 2.0);
					if (onStartRound) {
						console.log("Clicked Start Round");
						onStartRound();
					} else if (onStepRound) {
						console.log("Clicked Step Round");
						onStepRound();
					}
				}}
				style={{
					// position: 'absolute',
					transform: [
						{translate: [x, y, z]},
						{scale : 1.0 }
					],
				}}
			>
				<Text style={{
					backgroundColor: bgC,
					fontSize: 20,
					fontWeight: '400',
					borderRadius: 20,
					layoutOrigin: [0.5, 0.5],
					paddingLeft: this.state.open ? 12 : 8,
					paddingRight: this.state.open ? 12 : 8,
					textAlign: 'center',
					textAlignVertical: 'center',
				}}>
					{name}
				</Text>
			</VrButton>
		);
	}
}

Button.propTypes = {
	onStartRound: PropTypes.func,
	onStepRound: PropTypes.func,
	name: PropTypes.string
};