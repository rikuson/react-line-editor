export const CHANGE_VALUE = 'CHANGE_VALUE';
export const ADD_LINE = 'ADD_LINE';
export const APPEND_VALUE = 'APPEND_VALUE';
export const PREPEND_VALUE = 'PREPEND_VALUE';
export const ACTIVATE_LINE = 'ACTIVATE_LINE';
export const REMOVE_LINE = 'REMOVE_LINE';
export const DISACTIVATE_LINE = 'DISACTIVATE_LINE';
export const INTERPRET_VALUE = 'INTERPRET_VALUE';
export const KEY_UP = 'KEY_UP';
export const KEY_DOWN = 'KEY_DOWN';

export const changeValue = (linenumber, event, value = '') => ({
  type: CHANGE_VALUE,
  linenumber,
  event,
  value,
});

export const appendValue = (linenumber, event, value = '') => ({
  type: APPEND_VALUE,
  linenumber,
  event,
  value,
});

export const prependValue = (linenumber, event, value = '') => ({
  type: PREPEND_VALUE,
  linenumber,
  event,
  value,
});

export const addLine = (linenumber, event) => ({
  type: ADD_LINE,
  linenumber,
  event,
});

export const activateLine = (linenumber, event) => ({
  type: ACTIVATE_LINE,
  linenumber,
  event,
});

export const disactivateLine = (linenumber, event) => ({
  type: DISACTIVATE_LINE,
  linenumber,
  event,
});

export const removeLine = (linenumber, event) => ({
  type: REMOVE_LINE,
  linenumber,
  event,
});

export const storeKey = (key) => ({
  type: KEY_DOWN,
  key,
});

export const releaseKey = (key) => ({
  type: KEY_UP,
  key,
});
