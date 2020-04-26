import PropTypes from 'prop-types';
import React from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import TextField from './textfield';
import interpreter from '../interpreter';
import keybinder from '../keybinder';
import eventhandler from '../eventhandler';

class LineEditor extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <TextField
          style={this.props.style}
          autoFocus={this.props.autoFocus}
        />
      </Provider>
    );
  }
}

LineEditor.propTypes = {
  style: PropTypes.object,
  autoFocus: PropTypes.bool,
  interpreter: PropTypes.func,
  keybinder: PropTypes.func,
  eventhandler: PropTypes.func,
};

LineEditor.defaultProps = {
  style: {},
  autoFocus: false,
  interpreter,
  keybinder,
  eventhandler,
};

export default LineEditor;
