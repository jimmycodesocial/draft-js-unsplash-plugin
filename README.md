# draft-js-unsplash-plugin
Add Unsplash images in your draft-js editor.

*This is a plugin for `draft-js-plugins-editor`.*

![Demo](plugin.gif)

## Installation

```
npm install draft-js-unsplash-plugin
```

## Usage

```js
import createUnsplashPlugin from 'draft-js-unsplash-plugin';
const unsplashPlugin = createUnsplashPlugin({
  options: {
    accessKey: 'my-access-key'
  }
});
const { UnsplashButton } = unsplashPlugin;
```

## Configuration
TODO:

## Theming
The plugin ships with a default styling available at this location in the installed package: `node_modules/draft-js-unsplash-plugin/lib/plugin.css`

*Webpack Usage*
1.  Install Webpack loaders: `npm i style-loader css-loader --save-dev`
2.  Add the below section to Webpack config (if your config already has a loaders array, simply add the below loader object to your existing list.

```js
module.exports = {
  module: {
    loaders: [
      {
        test: /plugin\.css$/,
        loaders: [
          'style-loader', 'css',
        ]
      }
    ]
  }
};
``` 

3.  Add the below import line to your component to tell Webpack to inject the style to your component.


```js
import 'draft-js-unsplash-plugin/lib/plugin.css';
```

## Example
TODO:

## Integration
#### With other plugins
In this example you can see how integrate the plugin with `draft-js-focus-plugin` and `draft-js-alignment-plugin`. 

#### Axios
