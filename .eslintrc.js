// module.exports = {
//   root: true,
//   extends: '@react-native',
// };

module.exports = {
  root: true,
  extends: '@react-native',
  ignorePatterns: ['e2e/*.js', 'e2e/tests/*.js'],
  rules: {
    'react-native/no-inline-styles': 0,
    'react-hooks/exhaustive-deps': 0,
  },
};
