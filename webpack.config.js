const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 3000,
    https: {
      key: fs.readFileSync(path.join(__dirname, 'certs', 'key.pem')),
      cert: fs.readFileSync(path.join(__dirname, 'certs', 'cert.pem')),
      ca: fs.readFileSync(path.join(__dirname, 'certs', 'ca.pem')),
    },
  },
}; 