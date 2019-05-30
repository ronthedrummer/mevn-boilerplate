module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(gif|jpg|png|svg|mp3|aac|ogg|wav)$/,
        use: ['file-loader']
      }
    ]
  }
};
