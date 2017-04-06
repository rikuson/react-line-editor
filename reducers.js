import { combineReducers } from 'redux';
import { CHANGE_TEXT, INITIALIZE_EDITOR } from './actions';

const initialState = {
	editor: {
		text: 'test',
		editable: false,
	}
};

const editorReducer = (state = initialState.editor, action) => {
	switch(action.type){
		case CHANGE_TEXT:
			return {
				...state,
				text: action.text,
			};
		case INITIALIZE_EDITOR:
			return initialState.editor;
		default:
			return state;
	}
};

export default editorReducer;
