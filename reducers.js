import { combineReducers } from 'redux';
import shortid from 'shortid';
import { Remarkable } from 'remarkable';
import {
  ADD_LINE,
  CHANGE_VALUE,
  APPEND_VALUE,
  PREPEND_VALUE,
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

const line = (state, action) => {
  switch (action.type) {
    case ADD_LINE:
      return {
        ...formatText(action.value),
        key: shortid.generate(),
        editable: true,
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

const initialState = [{
  key: shortid.generate(),
  plain: '',
  markdown: '',
  html: '',
  position: 0,
  editable: true,
}];
const lines = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LINE:
      return [
        ...state.map((l) => {
          if (l.position >= action.position) l.position++;
          return l;
        }),
        line(null, action),
      ].sort((a, b) => a.position - b.position);
    case REMOVE_LINE:
      return state
        .filter((l) => l.position !== action.position)
        .map((l) => {
          if (l.position > action.position) l.position--;
          return l;
        });
    case CHANGE_VALUE:
    case APPEND_VALUE:
    case PREPEND_VALUE:
    case START_EDITING:
    case FINISH_EDITING:
      return state.map((l) => line(l, action));
    default:
      return state;
  }
};

export default combineReducers({
  lines,
});
