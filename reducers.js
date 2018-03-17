import { combineReducers } from 'redux';
import shortid from 'shortid';
import {
	ADD_LINE,
	CHANGE_TEXT,
	APPEND_TEXT,
	PREPEND_TEXT,
	START_EDITING,
	FINISH_EDITING,
	REMOVE_LINE,
} from './actions';

const line = (state, action) => {
	switch(action.type){
		case ADD_LINE:
			return {
				key: shortid.generate(),
				text: action.text,
				editable: true,
				position: action.position,
			};
		case CHANGE_TEXT:
			if (state.position === action.position) {
				return {
					...state,
					text: action.text,
				};
			} else {
				return state;
			}
		case APPEND_TEXT:
			if (state.position === action.position) {
				return {
					...state,
					text: state.text + action.text,
				};
			} else {
				return state;
			}
		case PREPEND_TEXT:
			if(state.position === action.position){
				return {
					...state,
					text: action.text + state.text,
				};
			} else {
				return state;
			}
		case START_EDITING:
			if (state.position === action.position) {
				return {
					...state,
					editable: true,
				};
			} else {
				return state;
			}
		case FINISH_EDITING:
			if (state.position === action.position) {
				return {
					...state,
					editable: false,
				};
			} else {
				return state;
			}
		default:
			return state;
	}
}

const lines = (state = [], action) => {
	switch(action.type) {
		case ADD_LINE:
			state = state.map(l => {
				if (l.position >= action.position) l.position++;
				return l;
			});
			return [
				...state,
				line(null, action),
			].sort((a, b) => a.position - b.position);
		case REMOVE_LINE:
			return state
				.filter(l => l.position !== action.position)
				.map(l => {
					if (l.position > action.position) l.position--;
					return l;
				});
		case CHANGE_TEXT:
		case APPEND_TEXT:
		case PREPEND_TEXT:
		case START_EDITING:
		case FINISH_EDITING:
			return state.map(l => line(l, action));
		default:
			return state;
	}
};

export default combineReducers({
	lines,
});
