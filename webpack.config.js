module.exports = {
  context: __dirname,
  entry: './lib/mandala_mania.js',
  output: {
    filename: './lib/bundle.js',
  },
  module: {
    loaders: [
      {

        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
        },
      },
    ],
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '*'],
  },
};

