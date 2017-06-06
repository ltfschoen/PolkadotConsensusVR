import {combineReducers} from 'redux';
import consensus from './consensusReducer';

const rootReducer = combineReducers({
	consensus: consensus
});

export default rootReducer;