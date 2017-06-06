import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as consensusActions from '../redux/actions/consensusActions';
import CylindricalPanelCustom from './lib/CylindricalPanelCustom';

class DNAStrand extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			consensus: Object.assign({}, props.consensus)
		};

		this.startRound = this.startRound.bind(this);
		this.stepRound = this.stepRound.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		console.log(`component:DNAStrand:componentWillReceiveProps - [nextProps: ${JSON.stringify(nextProps)}]`);
		this.setState({consensus: Object.assign({}, nextProps.consensus)});
	}

	startRound() {
		console.log(`component:DNAStrand:startRound`);
		this.props.actions.startRound()
			.then(() => console.log(`Successfully triggered start round`))
			.catch(error => { console.log(`Error triggering start round`); });
	}

	stepRound() {
		console.log(`component:DNAStrand:stepRound`);
		this.props.actions.stepRound()
			.then(() => console.log(`Successfully triggered step round`))
			.catch(error => { console.log(`Error triggering step round: ${error}`); });
	}

	render() {
		let { consensus } = this.props;

		return (
			<CylindricalPanelCustom
				onStartRound={this.startRound}
				onStepRound={this.stepRound}
				consensus={consensus}
			/>
		);
	}
}

DNAStrand.propTypes = {
	consensus: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
	// debugger;
	console.log(`component:DNAStrand:mapStateToProps - Received state [state: ${JSON.stringify(state)}] from Redux Store`);
	console.log(`component:DNAStrand:mapStateToProps - Received data(ownProps) from Redux Store`);
	return {
		consensus: state.consensus
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(consensusActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(DNAStrand);