import {combineReducers} from 'redux';
import skills from './skillReducer';

const rootReducer = combineReducers({
	skills: skills
});

export default rootReducer;