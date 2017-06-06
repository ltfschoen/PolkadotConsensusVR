import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import CylindricalPanelCustom from './lib/CylindricalPanelCustom';

class DNAStrand extends React.Component {
	render() {
		let { skills } = this.props;

		return (
			<CylindricalPanelCustom skills={skills} />
		);
	}
}

DNAStrand.propTypes = {
	skills: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
	// debugger;
	console.log(`component:DNAStrand:mapStateToProps - Received state [state: ${JSON.stringify(state)}] from Redux Store`);
	console.log(`component:DNAStrand:mapStateToProps - Received data(ownProps) from Redux Store`);
	return {
		skills: state.skills
	};
}

// Connect to Redux Store to get AJAX loading status and pass it down to Header
export default connect(mapStateToProps)(DNAStrand);