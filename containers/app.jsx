import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/header';
import LineEditor from './line-editor';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header lines={this.props.lineEditor.lines} />
        <LineEditor />
      </div>
    );
  }
}

App.propTypes = {
  lineEditor: PropTypes.shape({
    linenumber: PropTypes.number.isRequired,
    lines: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string.isRequired,
      html: PropTypes.string,
      value: PropTypes.string,
      text: PropTypes.string,
      active: PropTypes.bool.isRequired,
      linenumber: PropTypes.number.isRequired,
    }).isRequired).isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  lineEditor: state.lineEditor,
});

export default connect(
  mapStateToProps,
)(App);
