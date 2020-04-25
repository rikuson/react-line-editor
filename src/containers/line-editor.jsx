import PropTypes from 'prop-types';
import React from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import TextField from './textfield';

class LineEditor extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <TextField
          onClick={this.props.onClick}
          onFocus={this.props.onFocus}
          onBlur={this.props.onBlur}
          onChange={this.props.onChange}
          onPaste={this.props.onPaste}
          style={this.props.style}
          autoFocus={this.props.autoFocus}
        />
      </Provider>
    );
  }
}

LineEditor.propTypes = {
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onPaste: PropTypes.func,
  style: PropTypes.object,
  autoFocus: PropTypes.bool,
};

LineEditor.defaultProps = {
  onClick: (e, line) => {
    store.dispatch({ type: 'ACTIVATE_LINE', linenumber: line.linenumber });
  },
  onFocus: () => null,
  onBlur: (e, line) => {
    if (line.active) {
      store.dispatch({ type: 'DISACTIVATE_LINE', linenumber: line.linenumber });
    }
  },
  onChange: (e, line) => {
    const caret = e.target.selectionStart;
    store.dispatch({ type: 'BIND_POSITION', linenumber: line.linenumber, caret });
  },
  onPaste: () => null,
  style: {},
  autoFocus: false,
};

export default LineEditor;
