export const CHANGE_VALUE = 'CHANGE_VALUE';
export const INITIALIZE_EDITOR = 'INITIALIZE_EDITOR';
export const ADD_LINE = 'ADD_LINE';
export const APPEND_VALUE = 'APPEND_VALUE';
export const PREPEND_VALUE = 'PREPEND_VALUE';
export const ACTIVATE_LINE = 'ACTIVATE_LINE';
export const START_EDITING = 'START_EDITING';
export const REMOVE_LINE = 'REMOVE_LINE';
export const DISACTIVATE_LINE = 'DISACTIVATE_LINE';
export const INTERPRET_VALUE = 'INTERPRET_VALUE';

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

export const activateLine = (position) => ({
  type: ACTIVATE_LINE,
  position,
});

export const startEditing = (position) => ({
  type: START_EDITING,
  position,
});

export const disactivateLine = (position, value) => ({
  type: DISACTIVATE_LINE,
  position,
  value,
});

export const removeLine = (position) => ({
  type: REMOVE_LINE,
  position,
});
