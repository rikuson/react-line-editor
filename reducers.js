import { combineReducers } from 'redux';
import { BLUR_INPUT, CLICK_PREVIEW, CHANGE_TEXT, INITIALIZE_EDITOR } from './actions';

const initialState = {
	editor: {
		text: 'test',
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
		case CLICK_PREVIEW: // EDIT_TOGGLE better?
			return {
				...state,
				editable: action.editable
			};
		case BLUR_INPUT:
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
