import * as types from './actionTypes';
import skillApi from '../api/mockSkillApi';

// Action Creators
export function loadSkillsSuccess(skills) {
	console.log("action creators:loadSkillsSuccess - Called Action LOAD_SKILLS_SUCCESS");
	return { type: types.LOAD_SKILLS_SUCCESS, skills: skills };
}

export function updateSkillSuccess(skill) {
	console.log(`action creators:updateSkillsSuccess - Called Action UPDATE_SKILLS_SUCCESS [skill: ${JSON.stringify(skill)}]`);
	return { type: types.UPDATE_SKILL_SUCCESS, skill };
}

export function loadSkills() {
	return function(dispatch) {
		return skillApi.getAllSkills().then((skills) => {
			dispatch(loadSkillsSuccess(skills));
		}).catch(error => {
			throw(error);
		});
	};
}
