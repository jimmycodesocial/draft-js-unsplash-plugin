import decorateComponentWithProps from 'decorate-component-with-props';
import { UnsplashButton, UnsplashExplorer, Unsplash } from './components';
import { addBlock, addAtomicBlock, removeBlock } from './modifiers';
import { buildSearchPhotosUrl } from './utils';
import defaultTheme from './plugin.css';

const ATOMIC = 'atomic';
const defaultOptions = {
  accessKey: null,
  placeholder: 'Type to search Unsplash, and press Enter',
  
  // Pagination - results per page.
  perPage: 9,

  // Perform the search.
  onRequest: async (url) => {
    return (await fetch(url)).json();
  },

  // Metadata to inject with the image.
  getMetadata: (result) => ({
    src: result.urls.regular,
    urls: result.urls,
    description: result.description,
    width: result.width,
    height: result.height,
    user: result.user,
    source: result.links.html
  })
};

export default ({
  theme = {},
  options = {},
  explorerType = 'draft-js-unsplash-plugin-explorer',
  unsplashType = 'unsplash',
  decorator = (component) => component,
  unsplashComponent = Unsplash,
  editable = false
} = {}) => {

  // Modifiers.
  const addUnsplashExplorer = (editorState, data = {}) => addBlock(editorState, explorerType, data);
  const addUnsplash = (editorState, data = {}) => addAtomicBlock(editorState, unsplashType, data);

  // Plugin.
  const pluginOptions = Object.assign({}, defaultOptions, options);
  const pluginTheme = Object.assign({}, defaultTheme, theme);

  const ThemedExplorer = decorateComponentWithProps(UnsplashExplorer, { theme: pluginTheme });
  const DecoratedUnsplash = decorator(unsplashComponent);
  const ThemedUnsplash = decorateComponentWithProps(DecoratedUnsplash, { theme: pluginTheme });

  return {
    blockRendererFn: (block, { getEditorState, setEditorState, setReadOnly }) => {
      if (block.getType () === ATOMIC) {
        const contentState = getEditorState().getCurrentContent();
        const entityKey = block.getEntityAt(0);

        if (!entityKey) {
          return null;
        }

        if (contentState.getEntity(entityKey).getType() === unsplashType) {
          return {
            component: ThemedUnsplash,
            editable
          };
        }
      }
      else if (block.getType() === explorerType) {
        return {
          component: ThemedExplorer,
          editable: false,
          props: {
            placeholder: pluginOptions.placeholder,
            getMetadata: pluginOptions.getMetadata,
            setReadOnly,

            // When cancel the action.
            onCancel: (block) => {
              setEditorState(removeBlock(getEditorState(), block.key));
            },

            // When explore the gallery.
            // Search and navigation.
            onSearch: async (block, text, page) => {
              const url = buildSearchPhotosUrl(pluginOptions.accessKey, text, page, pluginOptions.perPage);

              return pluginOptions.onRequest(url);
            },

            // When select the picture.
            onSelect: (block, data) => {
              let editorState = removeBlock(getEditorState(), block.key);
              editorState = addUnsplash(editorState, data);
              setEditorState(editorState);
            }
          }
        };
      }
    },

    UnsplashButton: decorateComponentWithProps(UnsplashButton, {
      entityType: explorerType,
      addUnsplash: addUnsplashExplorer
    }),

    addUnsplashExplorer,
    addUnsplash
  };
};
