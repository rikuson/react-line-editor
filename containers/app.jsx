import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/header';
import TextField from './textfield';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header lines={this.props.textfield.lines} />
        <TextField />
      </div>
    );
  }
}

App.propTypes = {
  textfield: PropTypes.shape({
    position: PropTypes.number.isRequired,
    lines: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string.isRequired,
      html: PropTypes.string,
      markdown: PropTypes.string,
      text: PropTypes.string,
      editable: PropTypes.bool.isRequired,
      position: PropTypes.number.isRequired,
    }).isRequired).isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  textfield: state.textfield,
});

export default connect(
  mapStateToProps,
)(App);
