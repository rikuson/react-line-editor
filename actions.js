export const CHANGE_TEXT = 'CHANGE_TEXT';
export const TOGGLE_EDIT = 'TOGGLE_EDIT';
export const INITIALIZE_EDITOR = 'INITIALIZE_EDITOR';

export const changeText = text => ({
	type: CHANGE_TEXT,
	text,
});

export const toggleEdit = editable => ({
	type: TOGGLE_EDIT,
	editable,
});

export const initializeEditor = () => ({
	type: INITIALIZE_EDITOR,
});
