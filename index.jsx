import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import markdownInterpreter from './remarkable-interpreter';
import reducer from './reducers';
import App from './containers/app';

const middlewares = [];
if (process.env.NODE_ENV === 'development') {
  const logger = createLogger();
  middlewares.push(logger);
}
middlewares.push(markdownInterpreter);

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
const store = createStoreWithMiddleware(reducer);
const theme = createMuiTheme();

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </MuiThemeProvider>,
  window.document.getElementById('app'),
);
