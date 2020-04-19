import { combineReducers } from 'redux';
import shortid from 'shortid';
import {
  ADD_LINE,
  CHANGE_VALUE,
  APPEND_VALUE,
  PREPEND_VALUE,
  ACTIVATE_LINE,
  DISACTIVATE_LINE,
  REMOVE_LINE,
  INTERPRET_VALUE,
} from './actions';

const initialLine = {
  key: shortid.generate(),
  plain: '',
  value: '',
  html: '',
  linenumber: 0,
  active: true,
};
const line = (state = initialLine, action) => {
  switch (action.type) {
    case ADD_LINE:
      return {
        ...state,
        value: action.event.target.value,
        key: shortid.generate(),
        linenumber: action.linenumber,
      };
    case CHANGE_VALUE:
      if (state.linenumber === action.linenumber) {
        return {
          ...state,
          value: action.value,
        };
      }
    case APPEND_VALUE:
      if (state.linenumber === action.linenumber) {
        return {
          ...state,
          value: state.value + action.value,
        };
      }
    case PREPEND_VALUE:
      if (state.linenumber === action.linenumber) {
        return {
          ...state,
          value: action.value + state.value,
        };
      }
    case ACTIVATE_LINE:
      if (state.linenumber === action.linenumber) {
        return {
          ...state,
          active: true,
        };
      }
    case DISACTIVATE_LINE:
      if (state.linenumber === action.linenumber) {
        return {
          ...state,
          active: false,
        };
      }
    case INTERPRET_VALUE:
      if (state.linenumber === action.linenumber) {
        const { plain, html } = action;
        return {
          ...state,
          plain,
          html,
        };
      }
    default:
      return state;
  }
};

const initialLineEditor = {
  linenumber: 0,
  caret: 0,
  lines: [initialLine],
};
const lineEditor = (state = initialLineEditor, action) => {
  switch (action.type) {
    case ADD_LINE:
      return {
        ...state,
        lines: [
          ...state.lines.map((l) => {
            if (l.linenumber >= action.linenumber) l.linenumber++;
            return l;
          }),
          line(initialLine, action),
        ].sort((a, b) => a.linenumber - b.linenumber),
      };
    case REMOVE_LINE:
      return {
        ...state,
        lines: state.lines
          .filter((l) => l.linenumber !== action.linenumber)
          .map((l) => {
            if (l.linenumber > action.linenumber) l.linenumber--;
            return l;
          }),
      };
    case ACTIVATE_LINE:
      return {
        ...state,
        linenumber: action.linenumber,
        lines: state.lines.map((l) => line(l, action)),
      };
    case CHANGE_VALUE:
    case APPEND_VALUE:
    case PREPEND_VALUE:
    case DISACTIVATE_LINE:
    case INTERPRET_VALUE:
      return {
        ...state,
        lines: state.lines.map((l) => line(l, action)),
      };
    default:
      return state;
  }
};

export default combineReducers({
  lineEditor,
});
