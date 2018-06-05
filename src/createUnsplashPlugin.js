import decorateComponentWithProps from 'decorate-component-with-props';
import { UnsplashButton } from './components';
import defaultTheme from './plugin.css';

const ATOMIC = 'atomic';
const defaultOptions = {};

export default ({
  theme = {},
  options = {},
  explorerType = 'draft-js-unsplash-plugin-explorer',
  unsplashType = 'unsplash',
  decorator = (component) => component,
  unsplashComponent = Unsplash
} = {}) => {

  // Modifiers.
  const addUnsplashExplorer = (editorState, data = {}) => {};
  const addUnsplash = (editorState, data = {}) => {};

  // Plugin.
  const pluginOptions = Object.assign({}, defaultOptions, options);
  const pluginTheme = Object.assign({}, defaultTheme, theme);

  return {
    blockRendererFn: (block, { getEditorState, setEditorState, setReadOnly }) => {
    },

    UnsplashButton: decorateComponentWithProps(UnsplashButton, {
      entityType: explorerType,
      addUnsplash
    }),

    addUnsplashExplorer,
    addUnsplash
  };
};
