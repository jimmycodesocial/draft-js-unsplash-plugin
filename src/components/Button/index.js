import React from 'react';
import PropTypes from 'prop-types';

class UnsplashButton extends React.PureComponent {
  render () {
    return <div />;
  }
}

UnsplashButton.propTypes = {
  theme: PropTypes.object,
  entityType: PropTypes.string.isRequired,
  getEditorState: PropTypes.func.isRequired,
  setEditorState: PropTypes.func.isRequired,
  addUnsplash: PropTypes.func.isRequired,
};

UnsplashButton.defaultProps = {
  theme: {},
};

export default UnsplashButton;
