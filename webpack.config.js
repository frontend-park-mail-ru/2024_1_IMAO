const path = require('path');


module.exports = {
  mode: 'development',
  entry: './public/index.js',
  devtool: 'eval-source-map',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: "bundle.js"
  },
  module: {
    rules: [ 
      {
        test: /.jsx?$/,
        include: [
          path.resolve(__dirname, 'public')
        ],
        exclude: [
          path.resolve(__dirname, 'node_modules')
        ],
        loader: 'babel-loader',
        options: {
          presets: [
            [ "@babel/env", {
              "targets": {
                  "browsers": "last 2 chrome versions"
                }
              } 
            ]
          ]
        }
      },
      { 
        test: /\.hbs$/,
        include: [
          path.resolve(__dirname, 'public')
        ], 
        loader: 'handlebars-loader',
      },
      { 
        test: /\.css$/i, 
        use: [ 'style-loader', 'css-loader' ] 
      }
  ],
  }
};