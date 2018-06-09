import React from 'react';

export default class Unsplash extends React.PureComponent {
  render() {
    const {
      block,
      className,
      theme = {},
      ...otherProps
    } = this.props;

    const {
      blockProps, // eslint-disable-line no-unused-vars
      customStyleMap, // eslint-disable-line no-unused-vars
      customStyleFn, // eslint-disable-line no-unused-vars
      decorator, // eslint-disable-line no-unused-vars
      forceSelection, // eslint-disable-line no-unused-vars
      offsetKey, // eslint-disable-line no-unused-vars
      selection, // eslint-disable-line no-unused-vars
      tree, // eslint-disable-line no-unused-vars
      contentState,
      blockStyleFn,
      ...elementProps
    } = otherProps;

    const combinedClassName = `${theme.unsplash} ${className || ''}`;
    const { src, user, description } = contentState.getEntity(block.getEntityAt(0)).getData();
    const captionPrefix = description ? 
      `"${description}" by` 
      : 'Photo by';

    return (
      <div 
        className={combinedClassName}
        {...elementProps}>

      <img
        src={src}
        className={theme.unsplashImage}
        role="presentation" />

      <figcaption className={theme.unsplashCaption}>
        <span>
          {captionPrefix} <a href={user.links.html} target="_blank" title={user.links.html}>{user.name}</a> on <a href="https://unsplash.com" target="_blank">Unsplash</a>
        </span>
      </figcaption>
      </div>
    );
  }
}
