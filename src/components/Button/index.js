import React from 'react';
import PropTypes from 'prop-types';
import unionClassNames from 'union-class-names';
import { isCurrentBlockType } from '@jimmycode/draft-js-toolbox';

/**
 * Icon by: https://www.iconfinder.com/icons/115759/camera_icon
 */
class UnsplashButton extends React.PureComponent {
  onClick = (event) => {
    event.preventDefault();
    const { getEditorState, setEditorState, addUnsplash } = this.props;

    setEditorState(
      addUnsplash(getEditorState())
    );
  };

  onMouseDown = (event) => {
    event.preventDefault();
  }

  render () {
    const { theme, getEditorState, entityType } = this.props;
    const className = isCurrentBlockType(getEditorState(), entityType)
      ? unionClassNames(theme.button, theme.active)
      : theme.button;

    return (
      <div className={theme.buttonWrapper} onMouseDown={this.onMouseDown}>
        <button className={className} onClick={this.onClick} type="button">
          <svg 
            className="svgIcon" 
            enableBackground="new 0 0 32 32" 
            viewBox="0 0 32 32" 
            height="24" 
            width="24" 
            xmlns="http://www.w3.org/2000/svg">
            <path fill="#333333" fillRule="evenodd" d="M16,10.001c-4.419,0-8,3.581-8,8c0,4.418,3.581,8,8,8   c4.418,0,8-3.582,8-8C24,13.583,20.418,10.001,16,10.001z M20.555,21.906c-2.156,2.516-5.943,2.807-8.459,0.65   c-2.517-2.156-2.807-5.944-0.65-8.459c2.155-2.517,5.943-2.807,8.459-0.65C22.42,15.602,22.711,19.391,20.555,21.906z"/>
            <path fill="#333333" fillRule="evenodd" clipRule="evenodd" d="M16,14.001c-2.209,0-3.999,1.791-4,3.999v0.002   c0,0.275,0.224,0.5,0.5,0.5s0.5-0.225,0.5-0.5V18c0.001-1.656,1.343-2.999,3-2.999c0.276,0,0.5-0.224,0.5-0.5   S16.276,14.001,16,14.001z"/>
            <path fill="#333333" fillRule="evenodd" clipRule="evenodd" d="M29.492,9.042l-4.334-0.723l-1.373-3.434   C23.326,3.74,22.232,3,21,3H11C9.768,3,8.674,3.74,8.214,4.886L6.842,8.319L2.509,9.042C1.055,9.283,0,10.527,0,12v15   c0,1.654,1.346,3,3,3h26c1.654,0,3-1.346,3-3V12C32,10.527,30.945,9.283,29.492,9.042z M30,27c0,0.553-0.447,1-1,1H3   c-0.553,0-1-0.447-1-1V12c0-0.489,0.354-0.906,0.836-0.986l5.444-0.907l1.791-4.478C10.224,5.25,10.591,5,11,5h10   c0.408,0,0.775,0.249,0.928,0.629l1.791,4.478l5.445,0.907C29.646,11.094,30,11.511,30,12V27z"/>
          </svg>
        </button>
      </div>
    );
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
