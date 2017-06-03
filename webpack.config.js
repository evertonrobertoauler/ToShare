const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: {
    server: './src/server.ts'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  target: 'node',
  externals: [nodeExternals({
    whitelist: [
      /^@angular-mdl/,
      /^ngx-disqus/,   
      /^ng2-tag-input/,      
      /^ng2-material-dropdown/,      
      /^ngx-sharebuttons/,
      '/^jquery/',      
    ]
  })],
  node: {
    __dirname: true
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
     {
        test: /\.js$/,                
        use: [{
          loader: 'babel-loader',
          options: { presets: ['es2015'] },
        }],
      },
     { test: /\.ts$/, loader: 'ts-loader' }
    ]
  }
}
