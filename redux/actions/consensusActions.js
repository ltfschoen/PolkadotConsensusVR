import * as types from './actionTypes';
import consensusApi from '../api/mockConsensusApi';

// Action Creators
export function loadConsensusSuccess(consensus) {
	console.log("action creators:loadConsensusSuccess - Called Action LOAD_CONSENSUS_SUCCESS");
	return { type: types.LOAD_CONSENSUS_SUCCESS, consensus: consensus };
}

export function updateConsensusSuccess(consensus) {
	console.log(`action creators:updateConsensusSuccess - Called Action UPDATE_CONSENSUS_SUCCESS`);
	return { type: types.UPDATE_CONSENSUS_SUCCESS, consensus };
}

export function loadConsensus() {
	return function(dispatch) {
		return consensusApi.getConsensus().then((consensus) => {
			dispatch(loadConsensusSuccess(consensus));
		}).catch(error => {
			throw(error);
		});
	};
}

export function startRound() {
	console.log(`action creators:startRound - Called startRound`);
	return function(dispatch, getState) {
		return consensusApi.startRound().then((consensus) => {
			console.log(`action creators:startRound - Response from API: ${JSON.stringify(consensus)}`);
			dispatch(updateConsensusSuccess(consensus));
		}).catch(error => {
			throw(error);
		});
	};
}

export function stepRound() {
	console.log(`action creators:stepRound - Called stepRound`);
	return function(dispatch, getState) {
		return consensusApi.stepRound().then((consensus) => {
			console.log(`action creators:stepRound - Response from API: ${JSON.stringify(consensus)}`);
			dispatch(updateConsensusSuccess(consensus));
		}).catch(error => {
			throw(error);
		});
	};
}