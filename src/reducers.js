import { combineReducers } from 'redux';
import shortid from 'shortid';

const initialLine = {
  key: shortid.generate(),
  value: '',
  placeholder: '',
  children: '',
  className: '',
  linenumber: 0,
  active: false,
};
const line = (state = initialLine, action) => {
  switch (action.type) {
    case 'ADD_LINE':
      return {
        ...state,
        key: shortid.generate(),
        linenumber: action.linenumber,
      };
    case 'SET_VALUE':
      if (state.linenumber === action.linenumber) {
        return {
          ...state,
          value: action.value,
        };
      }
      return state;
    case 'SET_PLACEHOLDER':
      if (state.linenumber === action.linenumber) {
        return {
          ...state,
          placeholder: action.placeholder,
        };
      }
      return state;
    case 'APPEND_VALUE':
      if (state.linenumber === action.linenumber) {
        return {
          ...state,
          value: state.value + action.value,
        };
      }
      return state;
    case 'PREPEND_VALUE':
      if (state.linenumber === action.linenumber) {
        return {
          ...state,
          value: action.value + state.value,
        };
      }
      return state;
    case 'ACTIVATE_LINE':
      if (state.linenumber === action.linenumber) {
        return {
          ...state,
          active: true,
        };
      }
      return {
        ...state,
        active: false,
      };
    case 'DISACTIVATE_LINE':
      if (state.linenumber === action.linenumber) {
        return {
          ...state,
          active: false,
        };
      }
      return state;
    case 'RENDER_HTML':
      if (state.linenumber === action.linenumber) {
        const { className, children } = action;
        return {
          ...state,
          className,
          children,
        };
      }
      return state;
    default:
      return state;
  }
};

const initialTextField = {
  linenumber: 0,
  caret: 0,
  lines: [initialLine],
};
const lineEditor = (state = initialTextField, action) => {
  switch (action.type) {
    case 'ADD_LINE':
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
    case 'REMOVE_LINE':
      return {
        ...state,
        lines: state.lines
          .filter((l) => l.linenumber !== action.linenumber)
          .map((l) => {
            if (l.linenumber > action.linenumber) l.linenumber--;
            return l;
          }),
      };
    case 'BIND_POSITION':
      return {
        ...state,
        linenumber: action.linenumber,
        caret: action.caret,
      };
    case 'ACTIVATE_LINE':
      return {
        ...state,
        linenumber: action.linenumber,
        lines: state.lines.map((l) => line(l, action)),
      };
    case 'SET_VALUE':
    case 'SET_PLACEHOLDER':
    case 'APPEND_VALUE':
    case 'PREPEND_VALUE':
    case 'DISACTIVATE_LINE':
    case 'RENDER_HTML':
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
