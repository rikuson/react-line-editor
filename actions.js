export const CHANGE_TEXT = 'CHANGE_TEXT';
export const CLICK_PREVIEW = 'CLICK_PREVIEW';
export const BLUR_INPUT = 'BLUR_INPUT';
export const INITIALIZE_EDITOR = 'INITIALIZE_EDITOR';

export const changeText = text => ({
	type: CHANGE_TEXT,
	text,
});

export const clickPreview = editable => ({
	type: CLICK_PREVIEW,
	editable,
});

export const blurInput = editable => ({
	type: BLUR_INPUT,
	editable,
});

export const initializeEditor = () => ({
	type: INITIALIZE_EDITOR,
});
