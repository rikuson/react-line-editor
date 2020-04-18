import { combineReducers } from 'redux';
import shortid from 'shortid';
import {
  ADD_LINE,
  CHANGE_VALUE,
  APPEND_VALUE,
  PREPEND_VALUE,
  ACTIVATE_LINE,
  START_EDITING,
  DISACTIVATE_LINE,
  REMOVE_LINE,
  INTERPRET_VALUE,
} from './actions';

const initialLine = {
  key: shortid.generate(),
  plain: '',
  markdown: '',
  html: '',
  position: 0,
  editable: true,
};
const line = (state = initialLine, action) => {
  switch (action.type) {
    case ADD_LINE:
      return {
        ...initialLine,
        markdown: action.value,
        key: shortid.generate(),
        position: action.position,
      };
    case CHANGE_VALUE:
      if (state.position === action.position) {
        return {
          ...state,
          markdown: action.value,
        };
      }
    case APPEND_VALUE:
      if (state.position === action.position) {
        return {
          ...state,
          markdown: state.markdown + action.value,
        };
      }
    case PREPEND_VALUE:
      if (state.position === action.position) {
        return {
          ...state,
          markdown: action.value + state.markdown,
        };
      }
    case START_EDITING:
    case ACTIVATE_LINE:
      if (state.position === action.position) {
        return {
          ...state,
          editable: true,
        };
      }
    case DISACTIVATE_LINE:
      if (state.position === action.position) {
        return {
          ...state,
          editable: false,
        };
      }
    case INTERPRET_VALUE:
      if (state.position === action.position) {
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

const initialTextfield = {
  position: 0,
  lines: [initialLine],
};
const textfield = (state = initialTextfield, action) => {
  switch (action.type) {
    case ADD_LINE:
      return {
        ...state,
        lines: [
          ...state.lines.map((l) => {
            if (l.position >= action.position) l.position++;
            return l;
          }),
          line(null, action),
        ].sort((a, b) => a.position - b.position),
      };
    case REMOVE_LINE:
      return {
        ...state,
        lines: state.lines
          .filter((l) => l.position !== action.position)
          .map((l) => {
            if (l.position > action.position) l.position--;
            return l;
          }),
      };
    case START_EDITING:
      return {
        ...state,
        position: action.position,
        lines: state.lines.map((l) => line(l, action)),
      };
    case CHANGE_VALUE:
    case APPEND_VALUE:
    case PREPEND_VALUE:
    case ACTIVATE_LINE:
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
  textfield,
});
