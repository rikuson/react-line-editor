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
      } else {
        return state;
      }
    case APPEND_VALUE:
      if (state.position === action.position) {
        return {
          ...state,
          ...formatText(state.markdown + action.value),
        };
      } else {
        return state;
      }
    case PREPEND_VALUE:
      if(state.position === action.position){
        return {
          ...state,
          ...formatText(action.value + state.markdown),
        };
      } else {
        return state;
      }
    case START_EDITING:
      if (state.position === action.position) {
        return {
          ...state,
          editable: true,
        };
      } else {
        return state;
      }
    case FINISH_EDITING:
      if (state.position === action.position) {
        return {
          ...state,
          editable: false,
        };
      } else {
        return state;
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
