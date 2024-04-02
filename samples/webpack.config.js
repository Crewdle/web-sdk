const path = require('path');

module.exports = {
  entry: {
    index: './src/index.ts',
    chat: './src/chat/index.ts',
    monitoring: './src/monitoring/index.ts',
    monitoringComponent: './src/monitoring/component.ts',
    gpsTracking: './src/gpsTracking/index.ts',
    gpsTrackingComponent: './src/gpsTracking/component.ts',
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },

  output: {
    filename: '[name].js', // The name of the bundled JavaScript file
    path: path.resolve(__dirname, 'www/scripts'), // The output directory
    library: 'Crewdle',
  },
};
