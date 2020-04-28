import PropTypes from 'prop-types';
import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import reducer from '../reducers';
import TextField from './textfield';
import interpreter from '../interpreter';
import keybinder from '../keybinder';
import eventhandler from '../eventhandler';

class LineEditor extends React.Component {
  constructor(props) {
    super(props);

    const middlewares = [];
    if (process.env.NODE_ENV === 'development') {
      const logger = createLogger();
      middlewares.push(logger);
    }
    middlewares.push(this.props.interpreter);
    middlewares.push(this.props.keybinder);
    middlewares.push(this.props.eventhandler);

    const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
    const store = createStoreWithMiddleware(reducer);

    this.state = {
      store,
    };
  }

  render() {
    return (
      <Provider store={this.state.store}>
        <TextField
          style={this.props.style}
          autoFocus={this.props.autoFocus}
          placeholder={this.props.placeholder}
        >
          {this.props.children}
        </TextField>
      </Provider>
    );
  }
}

LineEditor.propTypes = {
  style: PropTypes.object,
  autoFocus: PropTypes.bool,
  children: PropTypes.string,
  placeholder: PropTypes.string,
  interpreter: PropTypes.func,
  keybinder: PropTypes.func,
  eventhandler: PropTypes.func,
};

LineEditor.defaultProps = {
  style: {},
  autoFocus: false,
  children: '',
  placeholder: '',
  interpreter,
  keybinder,
  eventhandler,
};

export default LineEditor;
