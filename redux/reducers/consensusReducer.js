import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function consensusReducer(state = initialState.consensus, action) {
	console.log(`reducer:consensusReducer - Called Redux Reducer Action [action.type: ${action.type}] and [state: ${state}]`);
	console.log(`reducer:consensusReducer - [action.consensus: ${action.consensus}]`);

	switch(action.type) {
		case types.LOAD_CONSENSUS_SUCCESS:
			return action.consensus; // Replace State with response from call to Mock API
		case types.UPDATE_CONSENSUS_SUCCESS:
			return [
				Object.assign({}, action.consensus)
			];
		default:
			// Return existing State
			return state;
	}
}