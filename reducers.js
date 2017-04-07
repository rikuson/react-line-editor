import { combineReducers } from 'redux';
import { TOGGLE_EDIT, CHANGE_TEXT, INITIALIZE_EDITOR } from './actions';

const initialState = {
	editor: {
		text: '',
		editable: false,
	},
};

const editorReducer = (state = initialState.editor, action) => {
	switch(action.type){
		case CHANGE_TEXT:
			return {
				...state,
				text: action.text,
			};
		case TOGGLE_EDIT:
			return {
				...state,
				editable: action.editable
			};
		case INITIALIZE_EDITOR:
			return initialState.editor;
		default:
			return state;
	}
};

export default editorReducer;
