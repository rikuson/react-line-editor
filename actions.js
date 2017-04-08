export const CHANGE_TEXT = 'CHANGE_TEXT';
export const TOGGLE_EDIT = 'TOGGLE_EDIT';
export const INITIALIZE_EDITOR = 'INITIALIZE_EDITOR';
export const ADD_LINE = 'ADD_LINE';

export const changeText = (id, text) => ({
	type: CHANGE_TEXT,
	id,
	text,
});

export const toggleEdit = (id) => ({
	type: TOGGLE_EDIT,
	id,
});

let nextLineId = 0;
export const addLine = () => ({
	type: ADD_LINE,
	id: nextLineId++,
});
