const path = require('path');


module.exports = {
  mode: 'development',
  entry: './public/index.js',
  devtool: 'eval-source-map',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        include: [
          path.resolve(__dirname, 'public'),
        ],
        exclude: [
          path.resolve(__dirname, 'node_modules'),
        ],
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/env', {
              'targets': {
                'browsers': 'last 2 chrome versions',
              },
            },
            ],
          ],
        },
      },
      {
        test: /\.hbs$/,
        include: [
          path.resolve(__dirname, 'public'),
        ],
        loader: 'handlebars-loader',
        options: {
          runtime: path.resolve(__dirname, 'server/handlebars'),
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },
};
