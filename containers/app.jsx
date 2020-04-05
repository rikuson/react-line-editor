import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/header';
import TextField from './textfield';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header lines={this.props.lines} />
        <TextField />
      </div>
    );
  }
}

App.propTypes = {
  lines: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    html: PropTypes.string,
    markdown: PropTypes.string,
    text: PropTypes.string,
    editable: PropTypes.bool.isRequired,
    position: PropTypes.number.isRequired,
  }).isRequired).isRequired,
};

const mapStateToProps = (state) => ({
  lines: state.lines,
});

export default connect(
  mapStateToProps,
)(App);
