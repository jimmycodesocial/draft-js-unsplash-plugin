import React from 'react';
import PropTypes from 'prop-types';
import decorateComponentWithProps from 'decorate-component-with-props';
import Gallery from 'react-photo-gallery';
import Pagination from './Pagination';
import Image from './Image';

class UnsplashExplorer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      page: 1,
      results: [],
      total: 0,
      pages: 0
    };
  }

  /**
   * Initially focused.
   */
  componentDidMount() {
    this.input.focus();
  }

  /**
   * Cancel action. Enable the edition again.
   */
  cancel = () => {
    this.props.blockProps.onCancel(this.props.block);
    this.props.blockProps.setReadOnly(false);
  }
  
  /**
   * Perform a search with pagination and current text.
   */
  search = (page = 1) => {
    if (!this.state.text) {
      return;
    }

    this.setState({ page }, () => {
      this.props.blockProps
        .onSearch(this.props.block, this.state.text, page)
        .then(json => {
          this.setState({
            total: json.total,
            results: json.results,
            pages: json.total_pages
          });
        });
    });
  };

  /**
   * Check if the focus is inside the container.
   */
  isFocused = ({ relatedTarget, currentTarget }) => {
    if (relatedTarget === null) {
      return false;
    }

    let node = relatedTarget;

    while (node !== null) {
      if (node === currentTarget) {
        return true;
      }

      node = node.parentNode;
    }
  
    return false;
  };

  /**
   * Cancel when the focus is lost.
   */
  onBlur = (event) => {
    if (!this.isFocused(event)) {
      this.cancel();
    }
  };

  /**
   * No editing while it has the focus.
   */
  onFocus = (event) => {
    this.props.blockProps.setReadOnly(true);  
  };

  /**
   * Text for searching.
   */
  onChange = (event) => {
    this.setState({ text: event.target.value });
  };

  /**
   * Detect cancellation keys.
   */
  onKeyDown = (event) => {
    // Cancel on Escape or Del.
    if ((event.keyCode === 27) || (event.keyCode === 46 && this.state.text.length === 0)) {
      this.cancel();
    }
  }

  /**
   * Trigger the search.
   */
  onKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.search(1);
    }
  };

  /**
   * Notify when the user selects the image.
   */
  onSelect = (event, { index, photo }) => {
    event.preventDefault();
    event.stopPropagation();
    this.props.blockProps.onSelect(this.props.block, photo);
    this.props.blockProps.setReadOnly(false);
  };
  
  render () {
    const { blockProps, theme } = this.props;
    const { placeholder } = blockProps;
    const { results, total, page, pages } = this.state;

    const photos = results.map(result => ({ 
      src: result.urls.regular,
      width: result.width,
      height: result.height,
      user: result.user
    }));

    const ThemedImage = decorateComponentWithProps(Image, { theme });

    return (
      <div 
        className={theme.explorer} 
        contentEditable={false}
        tabIndex={0}
        onBlur={this.onBlur} 
        onFocus={this.onFocus}>

        <input 
          ref={ref => this.input = ref}
          className={theme.explorerInput}
          placeholder={placeholder}
          value={this.state.text}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          onKeyPress={this.onKeyPress} />

        {results.length !== 0 && <div className={theme.explorerResults}>
          <Pagination 
            page={page} 
            pages={pages} 
            total={total} 
            onPaginate={this.search} 
            theme={theme} />

          <Gallery 
            photos={photos} 
            columns={3} 
            onClick={this.onSelect} 
            ImageComponent={ThemedImage} />            
        </div>}
      </div>
    );
  }
}

UnsplashExplorer.propTypes = {
  block: PropTypes.object,
  blockProps: PropTypes.shape({
    placeholder: PropTypes.string.isRequired,
    setReadOnly: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
  })
};

export default UnsplashExplorer;
