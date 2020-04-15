import { combineReducers } from 'redux';
import shortid from 'shortid';
import { Remarkable } from 'remarkable';
import {
  ADD_LINE,
  CHANGE_VALUE,
  APPEND_VALUE,
  PREPEND_VALUE,
  ACTIVATE_EDITOR,
  START_EDITING,
  FINISH_EDITING,
  REMOVE_LINE,
} from './actions';

const formatText = (markdown) => {
  const md = new Remarkable();
  const html = md.render(markdown).replace(/\n$/, '');
  const tmp = window.document.createElement('div');
  tmp.innerHTML = html;
  return {
    plain: tmp.textContent,
    markdown,
    html,
  };
};

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
        ...formatText(action.value),
        key: shortid.generate(),
        position: action.position,
      };
    case CHANGE_VALUE:
      if (state.position === action.position) {
        return {
          ...state,
          ...formatText(action.value),
        };
      }
    case APPEND_VALUE:
      if (state.position === action.position) {
        return {
          ...state,
          ...formatText(state.markdown + action.value),
        };
      }
    case PREPEND_VALUE:
      if (state.position === action.position) {
        return {
          ...state,
          ...formatText(action.value + state.markdown),
        };
      }
    case START_EDITING:
    case ACTIVATE_EDITOR:
      if (state.position === action.position) {
        return {
          ...state,
          editable: true,
        };
      }
    case FINISH_EDITING:
      if (state.position === action.position) {
        return {
          ...state,
          editable: false,
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
    case ACTIVATE_EDITOR:
    case FINISH_EDITING:
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
