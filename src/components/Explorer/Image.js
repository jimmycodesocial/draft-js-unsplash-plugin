import React from 'react';

export default ({ index, onClick, photo, margin, theme = {} }) => {
  return (
    <div 
      onClick={(e) => onClick(e, { index, photo })}
      className={theme.explorerResultsImage}
      style={{ margin, width: photo.width }} >

      <div 
        className={theme.explorerResultsMetadata} 
        style={{ width: photo.width }}>

        <a 
          href={photo.user.links.html} 
          target="_blank">
          {photo.user.name}
        </a>
      </div>

      <img
        src={photo.src}
        height={photo.height}
        width={photo.width}
        alt={photo.description || ''}
        styles={{
          display: 'block',
          transition: 'transform .135s cubic-bezier(0.0,0.0,0.2,1), opacity linear .15s'
        }} />
    </div>
  );
};
