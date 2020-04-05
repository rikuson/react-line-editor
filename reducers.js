import { combineReducers } from 'redux';
import shortid from 'shortid';
import { Remarkable } from 'remarkable';
import {
	ADD_LINE,
	CHANGE_VALUE,
	PASTE_VALUE,
	APPEND_VALUE,
	PREPEND_VALUE,
	START_EDITING,
	FINISH_EDITING,
	REMOVE_LINE,
} from './actions';

const formatText = (markdown) => {
  const md = new Remarkable();
  const html = md.render(markdown).replace(/\n$/, '');
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return {
    plain: tmp.textContent,
    markdown,
    html,
  };
};

const line = (state, action) => {
  switch(action.type){
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
          editable: true,
        };
      }
    case PREPEND_VALUE:
      if (state.position === action.position) {
        return {
          ...state,
          ...formatText(action.value + state.markdown),
          editable: true,
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
}

const lines = (state = [], action) => {
	switch(action.type) {
		case ADD_LINE:
			state = state.map(l => {
				if (l.position >= action.position) l.position++;
				return l;
			});
			return [
				...state,
				line(null, action),
			].sort((a, b) => a.position - b.position);
		case REMOVE_LINE:
			return state
				.filter(l => l.position !== action.position)
				.map(l => {
					if (l.position > action.position) l.position--;
					return l;
				});
		case PASTE_VALUE:
      const values = action.value.split("\n");
			state = state.map(l => {
				if (l.position > action.position) l.position += values.length - 2 || 0;
				return l;
			});
      const lastPosition = state.reduce((a, b) => (a.position > b.position ? a : b).position);
      return values.map((value, i) => {
        const position = action.position + i;
        if (i === 0) {
          return line(state.find(s => s.position === position), {
            ...action,
            type: APPEND_VALUE,
            value,
          });
        } else if (position === lastPosition) {
          return line(state.find(s => s.position === position), {
            ...action,
            type: PREPEND_VALUE,
            position,
            value,
          });
        }
        return line(null, {
          type: ADD_LINE,
          position,
          value,
        });
      });
		case CHANGE_VALUE:
		case APPEND_VALUE:
		case PREPEND_VALUE:
		case START_EDITING:
		case FINISH_EDITING:
			return state.map(l => line(l, action));
		default:
			return state;
	}
};

export default combineReducers({
	lines,
});
