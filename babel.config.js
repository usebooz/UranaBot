module.exports = {
  presets: [
    ['@babel/preset-env', {
      targets: {
        node: 'current'
      }
    }],
    '@babel/preset-typescript'
  ],
  plugins: [
    // Add any additional babel plugins if needed
  ],
  sourceMaps: 'inline',
  retainLines: true
};
