export const CHANGE_TEXT = 'CHANGE_TEXT';
export const INITIALIZE_EDITOR = 'INITIALIZE_EDITOR';

export const changeText = text => ({
	type: CHANGE_TEXT,
	text,
});

export const initializeEditor = () => ({
	type: INITIALIZE_EDITOR,
});
