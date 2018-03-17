export const CHANGE_TEXT = 'CHANGE_TEXT';
export const INITIALIZE_EDITOR = 'INITIALIZE_EDITOR';
export const ADD_LINE = 'ADD_LINE';
export const APPEND_TEXT = 'APPEND_TEXT';
export const PREPEND_TEXT = 'PREPEND_TEXT';
export const START_EDITING = 'START_EDITING';
export const REMOVE_LINE = 'REMOVE_LINE';
export const FINISH_EDITING = 'FINISH_EDITING';

export const changeText = (position, text) => ({
	type: CHANGE_TEXT,
	position,
	text,
});

export const appendText = (position, text) => ({
	type: APPEND_TEXT,
	position,
	text,
});

export const prependText = (position, text) => ({
	type: PREPEND_TEXT,
	position,
	text,
});

export const addLine = (position, text = '') => ({
	type: ADD_LINE,
	position,
	text,
});

export const startEditing = position => ({
	type: START_EDITING,
	position,
});

export const finishEditing = position => ({
	type: FINISH_EDITING,
	position,
});

export const removeLine = position => ({
	type: REMOVE_LINE,
	position,
});

