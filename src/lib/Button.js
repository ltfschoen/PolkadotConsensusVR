import React from 'react';
import {
	Image
} from 'react-vr';

const VrButton = require('VrButton');

export default class Button extends React.Component {
	constructor(props) {
		super(props);
		this.state = {open: false};
	}
	render() {
		let { x, y, z } = this.props;
		return (
			<VrButton
				onClick={() => {
					this.setState({open: !this.state.open});
				}}
				style={{
					// position: 'absolute',
					transform: [
						{translate: [x, y, z]},
						{scale : 1.0 }
					],
				}}
			>
				<Image
					style={{
						borderRadius: 20,
						height: this.state.open ? 66 : 60,
						margin: 10,
						width: this.state.open ? 132 : 120}}
					source={{
						uri: 'https://facebook.github.io/react/img/logo_og.png',
					}}
				/>
			</VrButton>
		);
	}
}