import nx from '@nx/eslint-plugin';
import baseConfig from '../../eslint.config.mjs';

export default [
  ...baseConfig,
  // Use correct format for Node.js configs
  ...(nx.configs.node || []),
  {
    files: ['**/*.ts'],
    rules: {
      'import/no-unresolved': 'off',
      'import/extensions': 'off',
    },
  },
];
