// module.exports = {
//   presets: ['module:@react-native/babel-preset'],
// };

module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        envName: 'APP_ENV',
        moduleName: '@env',
        path: '.env',
        blocklist: null,
        allowlist: null,
        safe: false,
        allowUndefined: true,
        verbose: false,
      },
    ],
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ts', '.tsx', '.js', '.json'],
        alias: {
          '@assets': './src/assets',
          '@components': './src/components',
          '@navigation': './src/navigation',
          '@layouts': './src/layouts',
          '@screens': './src/screens',
          '@utils': './src/utils',
          '@services': './src/services',
          '@redux': './src/redux',
          '@hooks': './src/hooks',
          '@config': './src/config',
        },
      },
    ],
    ['@babel/plugin-transform-flow-strip-types', { loose: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-transform-private-methods', { loose: true }],
    '@babel/plugin-transform-export-namespace-from',
    'react-native-worklets/plugin',
  ],
};
