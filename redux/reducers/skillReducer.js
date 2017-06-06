import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function skillReducer(state = initialState.skills, action) {
	console.log(`reducer:skillReducer - Called Redux Reducer Action [action.type: ${action.type}] and [state: ${JSON.stringify(state)}]`);
	console.log(`reducer:skillReducer - [action.skill: ${JSON.stringify(action.skill)}]`);

	switch(action.type) {
		case types.LOAD_SKILLS_SUCCESS:
			return action.skills; // Replace State with response from call to Mock API
		case types.UPDATE_SKILL_SUCCESS:
			return [...state.filter((skill) => skill.id !== action.skill.id),
				Object.assign({}, action.skill)
			];
		default:
			// Return existing State
			return state;
	}
}