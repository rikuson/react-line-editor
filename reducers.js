import { combineReducers } from 'redux';
import { ADD_LINE, TOGGLE_EDIT, CHANGE_TEXT } from './actions';

const line = (state, action) => {
	switch(action.type){
		case ADD_LINE:
			return {
				id: action.id,
				text: '',
				editable: false,
			}
		case CHANGE_TEXT:
			if(state.id === action.id){
				return {
					...state,
					text: action.text,
				};
			}else{
				return state;
			}
		case TOGGLE_EDIT:
			if(state.id === action.id){
				return {
					...state,
					editable: action.editable,
				};
			}else{
				return state;
			}
		default:
			return state;
	}
}

const lines = (state = [], action) => {
	switch(action.type){
		case ADD_LINE:
			return [
				...state,
				line(undefined, action),
			];
		case CHANGE_TEXT:
		case TOGGLE_EDIT:
			return state.map((l) =>
				line(l, action)
			);
		default:
			return state;
	}
};

export default combineReducers({
	lines,
});
