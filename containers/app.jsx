import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { ShortcutManager } from 'react-shortcuts';
import Header from '../components/header';
import LineEditor from './line-editor';
import keymap from '../keymap';

const shortcutManager = new ShortcutManager({ LINE_EDITOR: keymap });

class App extends React.Component {
  getChildContext() {
    return { shortcuts: shortcutManager };
  }

  render() {
    return (
      <div>
        <Header lines={this.props.lineEditor.lines} />
        <LineEditor autoFocus />
      </div>
    );
  }
}

App.propTypes = {
  lineEditor: PropTypes.shape({
    linenumber: PropTypes.number.isRequired,
    caret: PropTypes.number.isRequired,
    lines: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string.isRequired,
      children: PropTypes.element,
      value: PropTypes.string,
      text: PropTypes.string,
      active: PropTypes.bool.isRequired,
      linenumber: PropTypes.number.isRequired,
    }).isRequired).isRequired,
  }).isRequired,
};

App.childContextTypes = {
  shortcuts: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  lineEditor: state.lineEditor,
});

export default connect(
  mapStateToProps,
)(App);
