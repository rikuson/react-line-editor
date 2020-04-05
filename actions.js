export const CHANGE_VALUE = 'CHANGE_VALUE';
export const INITIALIZE_EDITOR = 'INITIALIZE_EDITOR';
export const ADD_LINE = 'ADD_LINE';
export const APPEND_VALUE = 'APPEND_VALUE';
export const PREPEND_VALUE = 'PREPEND_VALUE';
export const START_EDITING = 'START_EDITING';
export const REMOVE_LINE = 'REMOVE_LINE';
export const FINISH_EDITING = 'FINISH_EDITING';

export const changeValue = (position, value) => ({
	type: CHANGE_VALUE,
	position,
	value,
});

export const appendValue = (position, value) => ({
	type: APPEND_VALUE,
	position,
	value,
});

export const prependValue = (position, value) => ({
	type: PREPEND_VALUE,
	position,
	value,
});

export const addLine = (position, value = '') => ({
	type: ADD_LINE,
	position,
	value,
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

